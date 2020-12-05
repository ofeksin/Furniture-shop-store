<template>
  <div>
    <b-jumbotron>
      <div class="overlay"></div>
      <div class="inner"></div>
    </b-jumbotron>
    <b-container>
      <div v-if="!isHomePageLoadingSucceded">
        <h2 class="text-center">
          Something went wrong:( <br />Please try again later
        </h2>
      </div>
      <div v-if="isLoadingHomePage && isHomePageLoadingSucceded">
        <b-skeleton width="25%"></b-skeleton> <br />
        <b-row>
          <b-col cols="6" md="4">
            <b-skeleton-img></b-skeleton-img>
          </b-col>
          <b-col cols="6" md="4">
            <b-skeleton-img></b-skeleton-img>
          </b-col>
          <b-col cols="6" md="4">
            <b-skeleton-img></b-skeleton-img>
          </b-col>
        </b-row>
        <br />
        <b-skeleton width="25%"></b-skeleton> <br />
        <b-row>
          <b-col cols="6" md="4">
            <b-skeleton-img></b-skeleton-img>
          </b-col>
          <b-col cols="6" md="4">
            <b-skeleton-img></b-skeleton-img>
          </b-col>
          <b-col cols="6" md="4">
            <b-skeleton-img></b-skeleton-img>
          </b-col>
        </b-row>
      </div>

      <div
        :v-if="isHomePageLoadingSucceded"
        v-for="category in categories"
        :key="category.id"
      >
        <h2 class="category-name">{{ category.name }}</h2>

        <b-row>
          <ProductCard
            v-for="product in category.products.data"
            :key="product.id"
            v-bind:product="product"
          />
        </b-row>
        <div
          v-if="categories.length && !finishedLoadCategories"
          v-observe-visibility="handleScrolledToButton"
        ></div>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductCard from "./ProductCard";

export default {
  name: "shop",
  components: {
    ProductCard,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      "finishedLoadCategories",
      "categories",
      "isHomePageLoadingSucceded",
      "isLoadingHomePage",
    ]),
  },
  created() {
    if (this.finishedLoadCategories) {
      return;
    }
    this.loadHomePageCategories();
    // Eexcutes an Api request to fetch all categories
    //this.$store.dispatch("loadCategoryIds").then(() => {
    // Eexcutes an Api request to load categories products
    // this.$store.dispatch("loadCategoriesProducts");

    // Infinite scrolling listener
    this.handleScrolledToButton();
  },
  mounted() {},
  methods: {
    async loadHomePageCategories() {
      if (!this.categories.length) {
        await this.$store.dispatch("loadCategoryIds");
      }
      await this.$store.dispatch("loadCategoriesProducts");
    },
    handleScrolledToButton(isVisible) {
      if (this.finishedLoadCategories) {
        return;
      }
      if (!isVisible) {
        return;
      }
      //Load more products
      this.$store.dispatch("loadCategoriesProducts");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.jumbotron {
  background-image: url("https://images.pexels.com/photos/245208/pexels-photo-245208.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 90% 70%;
  position: relative;
  padding-top: 7rem;
  min-height: 65vh;
  margin-bottom: 4rem;
}
.jumbotron > .overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.205) 36%,
    rgba(0, 0, 0, 0.4114379027978379) 100%
  );
}

.jumbotron > .inner {
  position: relative;
  z-index: 2;
  color: white;
  text-transform: uppercase;
}
.jumbotron > .inner > h2 {
  font-weight: 700;
  font-size: 2.5rem;
}
.jumbotron > .inner > p {
  font-weight: 500;
}
.category-name {
  text-transform: uppercase;
  font-size: 1.7rem;
  font-weight: 700;
}
</style>
