<template>
  <div class="product-page">
    <b-container v-if="loading">
      <b-row>
        <b-col cols="12" md="6">
          <div>
            <b-skeleton-img></b-skeleton-img>
          </div>
        </b-col>
        <b-col cols="12" md="6">
          <b-skeleton></b-skeleton>
          <br />
          <b-card>
            <b-skeleton animation="wave" width="40%"></b-skeleton>
            <b-skeleton animation="wave" width="85%"></b-skeleton>
            <b-skeleton animation="wave" width="20%"></b-skeleton>
          </b-card>
          <br />
          <b-skeleton type="button"></b-skeleton>
        </b-col>
      </b-row>
    </b-container>

    <b-container v-else>
      <b-row>
        <b-col cols="12" md="6">
          <div>
            <b-carousel
              id="carousel-1"
              :interval="4000"
              controls
              indicators
              background="#ababab"
              img-width="1024"
              img-height="200"
              style="text-shadow: 1px 1px 2px #333"
            >
              <!-- Slides with image only -->
              <b-carousel-slide
                v-for="image in product.images"
                :key="image.id"
                :img-src="image.image_url"
              ></b-carousel-slide>
            </b-carousel>
          </div>
        </b-col>
        <b-col cols="12" md="6">
          <h2 class="product-title">{{ product.name }}</h2>
          <b-table-simple>
            <b-tbody>
              <b-tr>
                <b-th class="text-left">CATEGORY</b-th>
                <b-td class="text-left">{{ product.category }}</b-td>
              </b-tr>
              <b-tr>
                <b-th class="text-left">DESCRIPTION</b-th>
                <b-td class="text-left">{{ product.description }}</b-td>
              </b-tr>
              <b-tr>
                <b-th class="text-left">PRICE</b-th>
                <b-td class="text-left">{{ product.price }}$</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
          <b-button
            class="add-to-cart"
            @click="addItem"
            :disabled="isAddingToCart"
          >
            ADD TO CART <b-spinner small v-if="isAddingToCart"> </b-spinner
          ></b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ProductService from "../services/ProductService";
import { mapActions } from "vuex";
import { getImageUrl } from "../utils/ProductImage";
export default {
  name: "Product",

  created() {
    this.getProduct();
  },

  data() {
    return {
      product: "",
      loading: true,
      isAddingToCart: false,
    };
  },
  methods: {
    ...mapActions(["updateCartItem", "push_notification"]),
    ImageURL(image) {
      return getImageUrl(image);
    },
    addItem() {
      // Add item to cart
      const item = {
        product_id: this.product.id,
        price: this.product.price,
        name: this.product.name,
        quantity: 1,
        isAddToCart: true,
      };

      // Checks if the user has a token
      if (localStorage.getItem("token")) {
        this.isAddingToCart = true;

        this.updateCartItem(item)
          .then(() => {
            this.isAddingToCart = false;
          })
          .catch(() => {
            this.isAddingToCart = false;
            this.push_notification({
              type: "error",
              message: "Could not add product. Please try again.",
            });
          });
      } else {
        // User is not logged in.
        this.push_notification({
          type: "error",
          message: "You are not logged in",
        });

        setTimeout(() => {
          this.$store.commit("addItemIfNotLoggedIn", item);
          this.$router.push("/cart");
        }, 3000);
      }
    },
    async getProduct() {
      try {
        let res = await ProductService.get(this.$route.params.productId);
        this.product = res.data.product;

        this.loading = false;
      } catch (err) {
        this.$router.push("/notfound");
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product-title {
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 10px;
}

.product-page {
  margin-top: 10vh;
}
.add-to-cart {
  background: #fff;
  color: #1d1d1d;
  font-weight: bold;
  border-radius: 0px;
}
</style>
