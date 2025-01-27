<?php

namespace Database\Seeders;

use App\Models\Direccion;
use App\Models\LuminariaPotencia;
use App\Models\Rol;
use App\Models\User;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        //User::factory()->create([
        //    'name' => 'Test User',
        //    'email' => 'test@example.com',
        //]);

        if(Rol::count() === 0) {
            Rol::create([
                'nombre' => 'Administrador'
            ]);
            Rol::create([
                'nombre' => 'Usuario'
            ]);
        }

        if (Usuario::count() === 0) {
            Usuario::create([
                'IDRol' => 1,
                'nombre' => 'Administrador',
                'apellido' => '',
                'email' => 'admin@infocus.mx',
                'usuario' => 'admin',
                'password' => Hash::make('password')
            ]);
        }

        if (Direccion::count() === 0) {
            $this->call(DireccionesSeeder::class);
        }

        if (LuminariaPotencia::count() === 0) {
            $potencias = ['50 W', '75 w', '100 W', '150 W', '200 W', '250 W', '300 W'];
            foreach ($potencias as $potencia) {
                LuminariaPotencia::create([
                    'potencia' => $potencia
                ]);
            }
        }

    }
}
