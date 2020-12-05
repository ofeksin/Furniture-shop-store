<?php

namespace App\Http\Resources;
use App\Http\Resources\ProductImageResource;
use App\Http\Resources\CategoryResource;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public static $wrap = 'product';
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'            => $this->id,
            'name'          => $this->name,
            'description'   => $this->description,
            'category'      =>$this->whenLoaded('category')->name, 
            'price'         => $this->price,
            'images'        => ProductImageResource::collection($this->whenLoaded('images')), 

        ];
    }
}
