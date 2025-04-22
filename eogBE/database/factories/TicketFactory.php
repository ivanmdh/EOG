<?php

namespace Database\Factories;

use App\Models\Direccion;
use App\Models\Luminaria;
use App\Models\LuminariaLampara;
use App\Models\Ticket;
use App\Models\TicketTipoFalla;
use App\Models\Usuario;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Ticket::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'IDUsuario' => 1, // Asigna el ID 1 (Administrador)
            'IDLuminaria' => Luminaria::factory(), // Relación correcta con factory
            'IDDireccion' => function (array $attributes) {
                $luminaria = Luminaria::find($attributes['IDLuminaria']);
                return $luminaria ? $luminaria->IDDireccion : null;
            },
            'IDLampara' => LuminariaLampara::factory(), // Puede ser null si no todas las luminarias tienen lámparas registradas
            'IDTipoFalla' => $this->faker->numberBetween(1, 3), // Asigna un ID de tipo de falla aleatorio (1-3)
            'descripcion' => $this->faker->sentence(),
            'observaciones' => $this->faker->optional()->text(255), // Limita a 255 caracteres
            'estado' => $this->faker->numberBetween(1, 3), // Asumiendo estados 1, 2, 3
            // Los campos de cierre y fotos se dejan null por defecto
            'IDUsuario_cierre' => null,
            'IDTipoReparacion' => null,
            'IDFoto' => null,
            'IDFoto_previa' => null,
            'fecha_cierre' => null,
        ];
    }
}
