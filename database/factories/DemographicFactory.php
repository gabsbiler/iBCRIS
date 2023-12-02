<?php

namespace Database\Factories;

use App\Models\HouseholdMember;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Demographic>
 */
class DemographicFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'lastname' => $this->faker->lastName(),
            'firstname' => $this->faker->firstName(),
            'middlename' => $this->faker->lastName(),
            'tags' => $this->faker->randomElement(['alive', 'alive, teenage_pregnancy', 'dead']),
            'household_member_id' => HouseholdMember::factory()
        ];
    }
}
