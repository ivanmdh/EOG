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
                $event->sheet->getDelegate()->getColumnDimension('B')->setWidth(30); // Nombre
                $event->sheet->getDelegate()->getColumnDimension('C')->setWidth(30); // Calle
                $event->sheet->getDelegate()->getColumnDimension('D')->setWidth(10); // Número
                $event->sheet->getDelegate()->getColumnDimension('E')->setWidth(20); // Colonia
                $event->sheet->getDelegate()->getColumnDimension('F')->setWidth(15); // Código Postal
                $event->sheet->getDelegate()->getColumnDimension('G')->setWidth(20); // Ciudad
                $event->sheet->getDelegate()->getColumnDimension('H')->setWidth(20); // Estado
                $event->sheet->getDelegate()->getColumnDimension('I')->setWidth(20); // Cantidad de Luminarias
                $event->sheet->getDelegate()->getColumnDimension('J')->setWidth(20); // Fecha Registro
                $event->sheet->getDelegate()->getColumnDimension('K')->setWidth(20); // Última Actualización
                
                // Aplicar estilo al encabezado
                $event->sheet->getDelegate()->getStyle('A1:K1')->getFont()->setBold(true);
            },
        ];
    }
}
