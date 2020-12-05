<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;

use App\Http\Controllers\CartItemController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Auth routes 
Route::group(['prefix' => 'auth'], function () {
    Route::post('signup', [AuthController::class,'signup'])->name("signup");
    Route::post('login', [AuthController::class,'login'])->name("login");
});


Route::apiResource('products', ProductController::class)->except(['update', 'store', 'destroy']); 

Route::get("category/{id}/products",[CategoryController::class, 'getProducts']);
Route::get("category/",[CategoryController::class, 'index']);

// User is logged in
Route::group(['middleware'  => 'auth:api'], function () {
    Route::get('logout', [AuthController::class,'logout']);
    Route::apiResource('cart', CartItemController::class);

});
