<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\CartItem;
use App\Models\Product;

use Illuminate\Support\Facades\Auth;
use App\Http\Resources\CartItemResource;

class CartItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cartItems = Auth::user()->cartItems->loadMissing("product.images");
        return CartItemResource::collection($cartItems);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'product_id' => 'required|numeric|',
            'quantity' => 'required|numeric|min:1'
        ]);

        // Check if the product exists, if not return error
        $product = $this->checkIfProductExist( $request->product_id ); 

        // Check if the same product already added to the user cart
        $cartItem = $this->productExistInCart( $request->product_id );

        if( $cartItem ){
            $cartItemQuantity = $request->quantity;
            CartItem::where(['product_id' => $request->product_id, 'user_id' => Auth::user()->id ])->update([ 'quantity'=> $cartItemQuantity ]);
            
            $cartItem = $this->productExistInCart( $request->product_id );
            $cartItem->load("product");

            return new CartItemResource($cartItem);
        }else{
            $newCartItem = CartItem::create([
                'user_id'   => Auth::user()->id,
                'product_id'=> $request->product_id,
                'quantity'  => $request->quantity
            ]);

            $newCartItem->load("product");
            return new CartItemResource($newCartItem);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy( CartItem $cart )
    {
        if( $cart->user_id == Auth::user()->id ){
            $cart->delete();
        }else{
            return response()->json([
                'message'   => 'User id does not match'
            ], 400);   
        }

    }

    private function checkIfProductExist($product_id){
        try{
            $product = Product::findOrFail( $product_id );
        } catch (ModelNotFoundException $e){
            return response()->json([
                'message' => 'The product does not exist',
            ], 404); 
        }
    }
    
    private function productExistInCart($product_id){
        return  $cartItem = CartItem::Where( ['product_id'=>$product_id, 'user_id'=> Auth::user()->id ] )->first();
    }
}
