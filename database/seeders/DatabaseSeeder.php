<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Gabriel Biler',
            'email' => 'gabsbiler@gmail.com',
            'password' => bcrypt('gabsbiler331'),
            'role' => 'admin',
            'username' => 'gabsbiler',
            'barangay' => 'Cotta'
        ]);

        // \App\Models\Household::factory()->count(50)->create();
        // \App\Models\Demographic::factory()->count(20)->create();
    }
}
