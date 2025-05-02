<?php

namespace App\Exports;

use App\Models\Direccion;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;

class DireccionesExport implements FromView, WithEvents
{
    protected $fechaInicio;
    protected $fechaFin;

    public function __construct($fechaInicio = null, $fechaFin = null)
    {
        $this->fechaInicio = $fechaInicio;
        $this->fechaFin = $fechaFin;
    }

    public function view(): View
    {
        $query = Direccion::with('luminarias');
        
        // Aplicar filtro por rango de fechas si se proporcionan
        if ($this->fechaInicio && $this->fechaFin) {
            $query->whereBetween('created_at', [$this->fechaInicio, $this->fechaFin]);
        } elseif ($this->fechaInicio) {
            $query->where('created_at', '>=', $this->fechaInicio);
        } elseif ($this->fechaFin) {
            $query->where('created_at', '<=', $this->fechaFin);
        }
        
        $direcciones = $query->get();

        return view('exports.direcciones', [
            'direcciones' => $direcciones
        ]);
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                // Configurar anchos de columnas
                $event->sheet->getDelegate()->getColumnDimension('A')->setWidth(10); // ID
                $event->sheet->getDelegate()->getColumnDimension('B')->setWidth(20); // Núm. Cuenta
                $event->sheet->getDelegate()->getColumnDimension('C')->setWidth(20); // RPU
                $event->sheet->getDelegate()->getColumnDimension('D')->setWidth(30); // Nombre
                $event->sheet->getDelegate()->getColumnDimension('E')->setWidth(30); // Dirección
                $event->sheet->getDelegate()->getColumnDimension('F')->setWidth(20); // Colonia
                $event->sheet->getDelegate()->getColumnDimension('G')->setWidth(10); // Tarifa
                $event->sheet->getDelegate()->getColumnDimension('H')->setWidth(10); // Hilos
                $event->sheet->getDelegate()->getColumnDimension('I')->setWidth(15); // Carga Instalada
                $event->sheet->getDelegate()->getColumnDimension('J')->setWidth(15); // Demanda Cont.
                $event->sheet->getDelegate()->getColumnDimension('K')->setWidth(15); // Tipo Suministro
                $event->sheet->getDelegate()->getColumnDimension('L')->setWidth(15); // Promedio Diario
                $event->sheet->getDelegate()->getColumnDimension('M')->setWidth(15); // Núm. Medidor
                $event->sheet->getDelegate()->getColumnDimension('N')->setWidth(10); // Año
                $event->sheet->getDelegate()->getColumnDimension('O')->setWidth(15); // Fecha Censo
                $event->sheet->getDelegate()->getColumnDimension('P')->setWidth(15); // Núm. Lámparas
                $event->sheet->getDelegate()->getColumnDimension('Q')->setWidth(15); // Lámparas censadas
                $event->sheet->getDelegate()->getColumnDimension('R')->setWidth(20); // Fecha Registro
                
                // Aplicar estilo al encabezado
                $event->sheet->getDelegate()->getStyle('A1:S1')->getFont()->setBold(true);
            },
        ];
    }
}
