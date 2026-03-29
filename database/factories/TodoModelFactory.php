<?php

namespace Database\Factories;

use App\Models\TodoModel;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TodoModel>
 */
class TodoModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => fake()->text(),
            'title' => fake()->text(),
            'description' => fake()->text(),
            'status' => fake()->text(),
            'isCompleted' => fake()->text(),
            'user_id' => fake()->text(),
            'created_at' => $this->faker->dateTime(),
            'updated_at' => $this->faker->dateTime(),
        ];
    }
}
