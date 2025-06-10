<?php

namespace App\Exports;

use App\Models\LuminariaLampara;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;

class LamparasExport implements FromView, WithEvents
{
    public function __construct()
    {
        // Constructor simple sin parámetros de fecha
    }

    public function view(): View
    {
        $query = LuminariaLampara::with(['potencia', 'foto', 'luminaria.usuario', 'luminaria.direccion']);
        $lamparas = $query->get();

        return view('exports.lamparas', [
            'lamparas' => $lamparas
        ]);
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                // Configurar anchos de columnas
                $event->sheet->getDelegate()->getColumnDimension('A')->setWidth(15); // Folio Lampara
                $event->sheet->getDelegate()->getColumnDimension('B')->setWidth(15); // Folio Luminaria
                $event->sheet->getDelegate()->getColumnDimension('C')->setWidth(20); // Número de Serie
                $event->sheet->getDelegate()->getColumnDimension('D')->setWidth(15); // Potencia
                $event->sheet->getDelegate()->getColumnDimension('E')->setWidth(20); // Usuario
                $event->sheet->getDelegate()->getColumnDimension('F')->setWidth(40); // Dirección
                $event->sheet->getDelegate()->getColumnDimension('G')->setWidth(15); // Latitud
                $event->sheet->getDelegate()->getColumnDimension('H')->setWidth(15); // Longitud
                $event->sheet->getDelegate()->getColumnDimension('I')->setWidth(20); // Fecha de Registro
                
                // Aplicar estilo al encabezado
                $event->sheet->getDelegate()->getStyle('A1:I1')->getFont()->setBold(true);
            },
        ];
    }
}
