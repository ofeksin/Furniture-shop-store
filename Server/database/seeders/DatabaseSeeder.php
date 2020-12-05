<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Database\Seeder;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        Category::factory(13)->create()->each( function($category) {

            Product::factory(10)->create([ "category_id"=>$category->id] )->each( 
                function( $product ) use (&$category){
                    $category->products()->save($product)->make();  
                    ProductImage::factory(3)->create(["product_id"=>$product->id])->each( 
                        function( $image ) use (&$product){
                        $product->images()->save($image)->make();
                 });
            });
        });
    }
}