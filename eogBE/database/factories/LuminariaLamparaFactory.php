<?php

namespace Database\Factories;

use App\Models\Luminaria;
use App\Models\LuminariaLampara;
use App\Models\LuminariaFoto;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LuminariaLampara>
 */
class LuminariaLamparaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = LuminariaLampara::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'IDLuminaria' => Luminaria::factory(), // Asocia a una luminaria creada por su factory
            'IDPotencia' => $this->faker->numberBetween(1, 9), // Asigna un ID de potencia aleatorio entre 1 y 9
            'IDFoto' => LuminariaFoto::factory(), // Asocia una foto generada por LuminariaFotoFactory
            'IDFoto_secundaria' => LuminariaFoto::factory(), // Siempre genera foto secundaria
            'numero_serie' => $this->faker->unique()->bothify('LAM-####-####'), // 80% de probabilidad de tener número de serie
        ];
    }
}
