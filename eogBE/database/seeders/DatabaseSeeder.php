<?php

namespace Database\Seeders;

use App\Models\Direccion;
use App\Models\Luminaria; // Asegúrate de importar Luminaria
use App\Models\LuminariaPotencia;
use App\Models\Rol;
use App\Models\Ticket;
use App\Models\TicketTipoFalla;
use App\Models\TicketTipoReparacion;
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

        if (TicketTipoFalla::count() === 0) {
            $tipos = ['Falla Mecanica', 'Falla Electrica', 'Robo'];
            foreach ($tipos as $tipo) {
                TicketTipoFalla::create([
                    'descripcion' => $tipo
                ]);
            }
        }

        if (TicketTipoReparacion::count() === 0) {
            $tipos = ['Reconexion', 'Cambio'];
            foreach ($tipos as $tipo) {
                TicketTipoReparacion::create([
                    'descripcion' => $tipo
                ]);
            }
        }

        if (Direccion::count() === 0) {
            $this->call(DireccionesSeeder::class);
        }

        if (LuminariaPotencia::count() === 0) {
            // Añadir '70 W' a la lista de potencias
            $potencias = ['35 W', '50 W', '70 W', '75 w', '100 W', '150 W', '200 W', '250 W', '300 W'];
            foreach ($potencias as $potencia) {
                LuminariaPotencia::create([
                    'potencia' => $potencia
                ]);
            }
        }

        // --- Añadir creación de Luminarias --- 
        // Crear, por ejemplo, 50 luminarias usando el factory
        // Esto asumirá que el usuario ID 1 y las direcciones ya existen
        if (Luminaria::count() === 0) { // Opcional: solo si la tabla está vacía
            Luminaria::factory()->count(50)->create();
        }
        // --- Fin de añadir creación de Luminarias ---

        // --- Añadir creación de Tickets ---
        Ticket::factory()->count(30)->create();
        // --- Fin de añadir creación de Tickets ---
    }
}
