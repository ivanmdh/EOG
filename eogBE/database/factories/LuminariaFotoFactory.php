<?php

namespace Database\Factories;

use App\Models\LuminariaFoto;
use Illuminate\Database\Eloquent\Factories\Factory;

class LuminariaFotoFactory extends Factory
{
    protected $model = LuminariaFoto::class;

    public function definition(): array
    {
        $filename = $this->faker->unique()->lexify('foto_??????.jpg');
        $hash = $this->faker->unique()->sha256;
        return [
            'nombre_archivo' => $filename,
            'ruta_archivo' => '/storage/luminarias/' . $filename,
            'tipo_mime' => 'image/jpeg',
            'tamano_archivo' => $this->faker->numberBetween(10000, 500000),
            'ancho' => $this->faker->numberBetween(400, 1920),
            'alto' => $this->faker->numberBetween(300, 1080),
            'hash' => $hash,
            'fecha_subida' => $this->faker->dateTimeThisYear(),
        ];
    }
}
