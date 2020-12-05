<?php

namespace App\Http\Resources;
use App\Http\Resources\ProductImageResource;

use App\Models\Product;

use Illuminate\Http\Resources\Json\JsonResource;

class CartItemResource extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {

        return[
            "id"            => $this->id,
            "product_id"    => $this->product_id,
            "name"          => $this->whenLoaded('product')->name,
            "price"         => $this->whenLoaded('product')->price,
            "images"        => ProductImageResource::collection($this->whenLoaded('product')->images),
            "quantity"      => $this->quantity
        ];
    }
}
