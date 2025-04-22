<?php

namespace Database\Factories;

use App\Models\Direccion;
use App\Models\Luminaria;
use App\Models\Usuario;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Luminaria>
 */
class LuminariaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Luminaria::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Rango de coordenadas GPS especificado
        $minLat = 20.46923130071811;
        $maxLat = 20.489461848962446;
        $minLon = -100.96873586108116;
        $maxLon = -100.9467171769386;

        // Obtener un ID de dirección aleatorio existente
        $direccionId = Direccion::inRandomOrder()->first()->IDDireccion ?? null;

        return [
            'IDUsuario' => 1, // Asigna el ID 1 (Administrador)
            'IDDireccion' => $direccionId, // Asigna un ID de dirección aleatorio existente
            'ampliacion' => $this->faker->boolean(10), // 10% de probabilidad de ser true
            'latitud' => $this->faker->latitude($minLat, $maxLat),
            'longitud' => $this->faker->longitude($minLon, $maxLon),
        ];
    }
}
