<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Household>
 */
class HouseholdFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'BSN' => $this->faker->numberBetween(10000, 99999),
            'HUSN' => $this->faker->numberBetween(10000, 99999),
            'HSN' => $this->faker->numberBetween(10000, 99999),
            'Barangay' => $this->faker->country(),
            'surveyStatus' => $this->faker->boolean(),
        ];
    }
}
