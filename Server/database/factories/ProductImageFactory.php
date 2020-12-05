<?php

namespace Database\Factories;

use App\Models\Model;
use App\Models\ProductImage;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductImageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ProductImage::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            //'image_url'   => $this->faker->image(public_path('images'),400,400, null, false),
            'image_url'   =>"https://picsum.photos/400/400?random=" . $this->faker->numberBetween($min = 1000, $max = 10000),
        ];
    }
}
