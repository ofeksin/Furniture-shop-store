<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\CategoryCollection;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use Illuminate\Support\Facades\DB;
class CategoryController extends Controller
{
    //

    public function index()
    {   

        return Category::All();

    }

    public function getProducts( Request $request ) {
       $category = Category::findOrFail($request->id);
       
       $categoryProducts = Product::where("category_id",$category->id)->with("images")->simplePaginate(3);
       $category->products = $categoryProducts;
       return $category;
    }
}
