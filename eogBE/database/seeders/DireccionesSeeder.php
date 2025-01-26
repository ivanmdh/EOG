<?php

namespace Database\Seeders;

use App\Models\Direccion;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class DireccionesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $path = 'DATOS-CORTAZAR.csv';
        if (!file_exists($path) || !is_readable($path)) {
            echo "El archivo CSV no existe o no es legible.\n";
            return;
        }
        if (($handle = fopen($path, 'r')) !== false) {
            $header = fgetcsv($handle, 1000, ',');
            while (($data = fgetcsv($handle, 1000, ',')) !== false) {
                $numCuenta         = trim($data[0]);
                $rpu               = trim($data[1]);
                $nombre            = trim($data[2]);
                $direccion         = trim($data[3]);
                $colonia           = trim($data[4]);
                $tarifa            = trim($data[5]);
                $hilos             = (int) $data[6];
                $cargaInstalada    = (float) $data[7];
                $demandaCont       = (float) $data[8];
                $tipoSum           = (int) $data[9];
                $promedioDiario    = (float) $data[10];
                $numMedidor        = trim($data[11]);
                $anio              = (int) $data[12];
                $fechaCenso = null;
                if (!empty($data[13])) {
                    try {
                        $fechaCenso = Carbon::createFromFormat('d/m/Y', $data[13])->format('Y-m-d');
                    } catch (\Exception $e) {
                        echo "Error con la fecha en la línea: " . implode(', ', $data) . "\n";
                        continue;
                    }
                }
                $numLamparas = (int) $data[14];

                Direccion::create([
                    'num_cuenta'       => $numCuenta,
                    'rpu'              => $rpu,
                    'nombre'           => $nombre,
                    'direccion'        => $direccion,
                    'colonia'          => $colonia,
                    'tarifa'           => $tarifa,
                    'hilos'            => $hilos,
                    'carga_instalada'  => $cargaInstalada,
                    'demanda_cont'     => $demandaCont,
                    'tipo_sum'         => $tipoSum,
                    'promedio_diario'  => $promedioDiario,
                    'num_medidor'      => $numMedidor,
                    'anio'             => $anio,
                    'fecha_censo'      => $fechaCenso,
                    'num_lamparas'     => $numLamparas,
                ]);
            }

            fclose($handle);
        }
    }
}
