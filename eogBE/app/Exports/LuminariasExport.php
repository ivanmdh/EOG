<?php

namespace App\Exports;

use App\Models\Luminaria;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;

class LuminariasExport implements FromView, WithEvents
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
        $query = Luminaria::with('direccion');
        
        // Aplicar filtro por rango de fechas si se proporcionan
        if ($this->fechaInicio && $this->fechaFin) {
            $query->whereBetween('created_at', [$this->fechaInicio, $this->fechaFin]);
        } elseif ($this->fechaInicio) {
            $query->where('created_at', '>=', $this->fechaInicio);
        } elseif ($this->fechaFin) {
            $query->where('created_at', '<=', $this->fechaFin);
        }
        
        $luminarias = $query->get();

        return view('exports.luminarias', [
            'luminarias' => $luminarias
        ]);
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                // Configurar anchos de columnas
                $event->sheet->getDelegate()->getColumnDimension('A')->setWidth(10); // ID
                $event->sheet->getDelegate()->getColumnDimension('B')->setWidth(20); // Tipo
                $event->sheet->getDelegate()->getColumnDimension('C')->setWidth(15); // Potencia
                $event->sheet->getDelegate()->getColumnDimension('D')->setWidth(15); // Estado
                $event->sheet->getDelegate()->getColumnDimension('E')->setWidth(40); // Dirección
                $event->sheet->getDelegate()->getColumnDimension('F')->setWidth(20); // Fecha de Instalación
                $event->sheet->getDelegate()->getColumnDimension('G')->setWidth(20); // Fecha de Registro
                $event->sheet->getDelegate()->getColumnDimension('H')->setWidth(20); // Última Actualización
                
                // Aplicar estilo al encabezado
                $event->sheet->getDelegate()->getStyle('A1:H1')->getFont()->setBold(true);
            },
        ];
    }
}
