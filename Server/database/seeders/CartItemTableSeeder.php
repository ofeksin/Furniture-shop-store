<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class CartItemTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('cart_items')->insert([
            'product_id' => 1,
            'user_id' => 3,
            'quantity'=> 2
        ]);
        DB::table('cart_items')->insert([
            'product_id' => 1,
            'user_id' => 1,
            'quantity'=> 2
        ]);
        DB::table('cart_items')->insert([
            'product_id' => 3,
            'user_id' => 3,
            'quantity'=> 2
        ]);
    }
}
