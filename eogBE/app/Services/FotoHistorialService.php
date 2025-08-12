<?php

namespace App\Services;

use App\Models\LuminariaLampara;
use App\Models\LuminariaFoto;
use App\Models\Ticket;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class FotoHistorialService
{
    /**
     * Maneja el historial de fotos al cerrar un ticket
     * 
     * @param Ticket $ticket
     * @param int $nuevaFotoId
     * @return bool
     */
    public function procesarCierreTicket(Ticket $ticket, int $nuevaFotoId): bool
    {
        try {
            DB::beginTransaction();
            
            $lampara = $ticket->lampara;
            
            if (!$lampara) {
                throw new \Exception('Lámpara no encontrada para el ticket');
            }
            
            // Log del estado inicial
            Log::info('Procesando cierre de ticket', [
                'ticket_id' => $ticket->IDTicket,
                'lampara_id' => $lampara->IDLampara,
                'foto_actual_lampara' => $lampara->IDFoto,
                'nueva_foto' => $nuevaFotoId
            ]);
            
            // PASO 1: Guardar la foto actual de la lámpara como foto previa del ticket
            if ($lampara->IDFoto) {
                $ticket->IDFoto_previa = $lampara->IDFoto;
                Log::info('Foto previa asignada al ticket', [
                    'ticket_id' => $ticket->IDTicket,
                    'foto_previa' => $lampara->IDFoto
                ]);
            }
            
            // PASO 2: Asignar la nueva foto al ticket
            $ticket->IDFoto = $nuevaFotoId;
            
            // PASO 3: Mover la foto actual de la lámpara a foto secundaria
            // Solo si existe una foto actual y es diferente a la nueva
            if ($lampara->IDFoto && $lampara->IDFoto != $nuevaFotoId) {
                $lampara->IDFoto_secundaria = $lampara->IDFoto;
                Log::info('Foto secundaria actualizada en lámpara (deslizada desde actual)', [
                    'lampara_id' => $lampara->IDLampara,
                    'foto_secundaria' => $lampara->IDFoto
                ]);
            }
            
            // PASO 4: Actualizar la foto actual de la lámpara con la nueva foto
            $lampara->IDFoto = $nuevaFotoId;
            
            // Guardar cambios
            $ticket->save();
            $lampara->save();
            
            DB::commit();
            
            Log::info('Historial de fotos procesado correctamente', [
                'ticket_id' => $ticket->IDTicket,
                'lampara_id' => $lampara->IDLampara,
                'foto_actual' => $nuevaFotoId,
                'foto_secundaria' => $lampara->IDFoto_secundaria,
                'foto_previa_ticket' => $ticket->IDFoto_previa
            ]);
            
            return true;
            
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error al procesar historial de fotos', [
                'ticket_id' => $ticket->IDTicket ?? null,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return false;
        }
    }
    
    /**
     * Obtiene el historial completo de fotos de una lámpara
     * 
     * @param int $lamparaId
     * @return array
     */
    public function obtenerHistorialFotos(int $lamparaId): array
    {
        $lampara = LuminariaLampara::find($lamparaId);
        
        if (!$lampara) {
            return [];
        }
        
        $historial = [];
        
        // Foto actual
        if ($lampara->IDFoto) {
            $historial[] = [
                'tipo' => 'actual',
                'foto' => $lampara->foto,
                'fecha' => $lampara->updated_at,
                'descripcion' => 'Foto actual de la lámpara'
            ];
        }
        
        // Foto anterior (ahora es foto secundaria que actúa como anterior)
        if ($lampara->IDFoto_secundaria) {
            $historial[] = [
                'tipo' => 'anterior',
                'foto' => $lampara->foto_secundaria,
                'fecha' => null, // Se podría obtener del último ticket que la usó
                'descripcion' => 'Foto anterior de la lámpara (antes del último cambio)'
            ];
        }
        
        // Fotos de tickets relacionados
        $tickets = Ticket::where('IDLampara', $lamparaId)
            ->whereNotNull('IDFoto')
            ->orderBy('fecha_cierre', 'desc')
            ->get();
            
        foreach ($tickets as $ticket) {
            if ($ticket->IDFoto) {
                $historial[] = [
                    'tipo' => 'ticket',
                    'foto' => $ticket->foto,
                    'fecha' => $ticket->fecha_cierre,
                    'descripcion' => "Foto del ticket #{$ticket->IDTicket}",
                    'ticket_id' => $ticket->IDTicket
                ];
            }
        }
        
        // Ordenar por fecha descendente
        usort($historial, function($a, $b) {
            $fechaA = $a['fecha'] ?? now();
            $fechaB = $b['fecha'] ?? now();
            return $fechaB <=> $fechaA;
        });
        
        return $historial;
    }
    
    /**
     * Valida que una foto existe y no está huérfana
     * 
     * @param int $fotoId
     * @return bool
     */
    public function validarFoto(int $fotoId): bool
    {
        $foto = LuminariaFoto::find($fotoId);
        
        if (!$foto) {
            return false;
        }
        
        // Verificar si la foto tiene alguna relación
        $tieneRelaciones = 
            $foto->lamparasPrincipales()->exists() ||
            $foto->lamparasSecundarias()->exists() ||
            $foto->tickets()->exists() ||
            $foto->ticketsPrevios()->exists();
            
        return $tieneRelaciones;
    }
    
    /**
     * Encuentra fotos huérfanas (sin relaciones)
     * 
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function encontrarFotosHuerfanas()
    {
        return LuminariaFoto::whereDoesntHave('lamparasPrincipales')
            ->whereDoesntHave('lamparasSecundarias')
            ->whereDoesntHave('tickets')
            ->whereDoesntHave('ticketsPrevios')
            ->get();
    }
}
