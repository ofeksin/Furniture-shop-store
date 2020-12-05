<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;
    protected  $fillable = ['user_id','product_id','quantity'];


    function product(){
       return $this->belongsTo('App\Models\Product');
    }

}
