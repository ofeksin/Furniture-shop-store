<template>
  <b-col cols="6" md="4">
    <b-card
      @click="redirectToProductPage"
      :img-src="product.images[0].image_url"
      img-alt="Image"
      tag="article"
      style="max-width: 20rem"
      class="mb-2 product_card"
    >
      <b-card-title>
        {{ product.name }}<br />
        ${{ product.price }}</b-card-title
      >
    </b-card>
  </b-col>
</template>

<script>
import { getImageUrl } from "../utils/ProductImage";

export default {
  name: "ProductCard",
  props: {
    product: Object,
  },
  created() {},
  methods: {
    ImageURL(image) {
      return getImageUrl(image);
    },
    redirectToProductPage() {
      return this.$router.push(`/products/${this.product.id}`);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product_card {
  border: 0px !important;
  cursor: pointer;
}

.product_card img {
  padding-bottom: 10px;
}
.card-body {
  padding: 0;
  text-transform: uppercase;
}
.card-body h4 {
  font-size: 0.9rem !important;
}
</style>
