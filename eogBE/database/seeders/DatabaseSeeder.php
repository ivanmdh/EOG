<?php

namespace Database\Seeders;

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

        if (Usuario::count() === 0) {
            Usuario::create([
                'nombre' => 'Administrador',
                'apellido' => '',
                'email' => 'admin@infocus.mx',
                'usuario' => 'admin',
                'password' => Hash::make('password')
            ]);
        }

    }
}
