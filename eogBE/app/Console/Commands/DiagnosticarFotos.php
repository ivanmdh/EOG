<?php

namespace App\Console\Commands;

use App\Services\FotoHistorialService;
use Illuminate\Console\Command;

class DiagnosticarFotos extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fotos:diagnosticar {--limpiar : Limpia automáticamente las fotos huérfanas}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Diagnostica el estado de las fotos en el sistema y encuentra fotos huérfanas';

    protected $fotoHistorialService;

    public function __construct(FotoHistorialService $fotoHistorialService)
    {
        parent::__construct();
        $this->fotoHistorialService = $fotoHistorialService;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🔍 Iniciando diagnóstico de fotos...');
        $this->newLine();

        // Obtener estadísticas generales
        $totalFotos = \App\Models\LuminariaFoto::count();
        $fotosHuerfanas = $this->fotoHistorialService->encontrarFotosHuerfanas();
        $cantidadHuerfanas = $fotosHuerfanas->count();
        $fotosEnUso = $totalFotos - $cantidadHuerfanas;

        // Mostrar resumen
        $this->table(
            ['Métrica', 'Cantidad', 'Porcentaje'],
            [
                ['Total de fotos', $totalFotos, '100%'],
                ['Fotos en uso', $fotosEnUso, $totalFotos > 0 ? round(($fotosEnUso / $totalFotos) * 100, 2) . '%' : '0%'],
                ['Fotos huérfanas', $cantidadHuerfanas, $totalFotos > 0 ? round(($cantidadHuerfanas / $totalFotos) * 100, 2) . '%' : '0%'],
            ]
        );

        if ($cantidadHuerfanas > 0) {
            $this->newLine();
            $this->warn("⚠️  Se encontraron {$cantidadHuerfanas} fotos huérfanas:");
            
            // Mostrar detalles de fotos huérfanas
            $headers = ['ID', 'Nombre', 'Hash', 'Tamaño (KB)', 'Fecha subida'];
            $rows = [];
            
            foreach ($fotosHuerfanas->take(10) as $foto) {
                $rows[] = [
                    $foto->IDFoto,
                    $foto->nombre_archivo,
                    substr($foto->hash, 0, 16) . '...',
                    round($foto->tamano_archivo / 1024, 2),
                    $foto->fecha_subida->format('d/m/Y H:i')
                ];
            }
            
            $this->table($headers, $rows);
            
            if ($cantidadHuerfanas > 10) {
                $this->info("... y " . ($cantidadHuerfanas - 10) . " fotos más.");
            }

            // Opción de limpieza
            if ($this->option('limpiar')) {
                if ($this->confirm('¿Deseas eliminar automáticamente las fotos huérfanas?')) {
                    $this->limpiarFotosHuerfanas($fotosHuerfanas);
                }
            } else {
                $this->newLine();
                $this->info('💡 Para limpiar automáticamente las fotos huérfanas, ejecuta:');
                $this->line('   php artisan fotos:diagnosticar --limpiar');
            }
        } else {
            $this->info('✅ No se encontraron fotos huérfanas. El sistema está en buen estado.');
        }

        $this->newLine();
        $this->info('✨ Diagnóstico completado.');
    }

    /**
     * Limpia las fotos huérfanas
     */
    private function limpiarFotosHuerfanas($fotosHuerfanas)
    {
        $this->info('🧹 Limpiando fotos huérfanas...');
        
        $bar = $this->output->createProgressBar($fotosHuerfanas->count());
        $bar->start();
        
        $eliminadas = 0;
        foreach ($fotosHuerfanas as $foto) {
            try {
                $foto->delete(); // Soft delete
                $eliminadas++;
            } catch (\Exception $e) {
                $this->error("Error al eliminar foto {$foto->IDFoto}: " . $e->getMessage());
            }
            $bar->advance();
        }
        
        $bar->finish();
        $this->newLine(2);
        
        if ($eliminadas > 0) {
            $this->info("✅ Se eliminaron {$eliminadas} fotos huérfanas exitosamente.");
        } else {
            $this->error("❌ No se pudieron eliminar las fotos huérfanas.");
        }
    }
}
