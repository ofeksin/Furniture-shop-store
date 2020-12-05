<template>
  <div class="category_card">
    <h2 class="category-name">{{ this.category.name }}</h2>
    <b-row>
      <ProductCard
        v-for="product in products"
        :key="product.id"
        v-bind:product="product"
      />
    </b-row>
  </div>
</template>

<script>
import CategoryService from "../services/CategoryService";
import ProductCard from "./ProductCard";

export default {
  name: "CategoryCard",
  props: {
    category: Object,
  },
  components: {
    ProductCard,
  },
  data() {
    return {
      products: Array,
    };
  },
  created() {
    this.getCategoryProducts();
  },
  methods: {
    async getCategoryProducts() {
      try {
        let res = await CategoryService.getProducts(this.category.id);
        this.products = res.data.products;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.category-name {
  text-transform: uppercase;
  font-size: 1.7rem;
  font-weight: 700;
}
.category_card {
  margin-bottom: 20px;
}
</style>
