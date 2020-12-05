<template>
  <div class="cart">
    <b-container>
      <h2>MY CART</h2>
      <b-table-simple responsive v-if="!this.isLoadingCart">
        <b-tbody>
          <b-tr v-for="item in cartItems" :key="item.id">
            <b-td>
              <a @click="getProductPageUrl(item.product_id)">
                <b-img
                  v-bind="mainProps"
                  :src="item.images[0].image_url"
                  fluid
                ></b-img> </a
            ></b-td>
            <b-td
              ><a @click="getProductPageUrl(item.product_id)">{{
                item.name
              }}</a></b-td
            >
            <b-td><b>IN STOCK</b></b-td>
            <b-td>
              <input
                type="number"
                :value="item.quantity"
                @change="changeQuantity($event, item)"
                min="1"
                size="5"
              />
              <br /><a class="remove-item-link" @click="removeItem(item.id)">
                REMOVE ITEM</a
              ></b-td
            >
            <b-td>
              <b>${{ calculateItemTotalPrice(item.quantity, item.price) }}</b
              ><br />
              ${{ item.price }} (PER ONE)</b-td
            >
          </b-tr>
          <b-tr v-if="this.cartTotalItems !== 0">
            <b-td colspan="3"></b-td>
            <b-td><b>QUANTITY: </b>{{ cartTotalItems }}</b-td>
            <b-td><b>TOTAL: </b> ${{ totalPrice }}</b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>

      <h1 class="text-center" v-if="this.isLoadingCart">
        Loading your cart...
      </h1>
      <h1 class="text-center" v-if="!this.isLoadingCart && this.isCartEmpty">
        Your cart is empty :(
      </h1>
    </b-container>
  </div>
</template>

<script>
import { getImageUrl } from "../../utils/ProductImage";

import { mapGetters, mapActions } from "vuex";
export default {
  name: "Cart",
  components: {},
  data() {
    return {
      qty: "",
      mainProps: { width: "150px", height: "150px" },
    };
  },
  created() {
    console.log(this.$store.state);
    // Check if guest item exist
    if (Object.keys(this.$store.getters.getGuestItem).length === 0) {
      // Guest file is null so just load the cart items

      if (!this.cartItems.length) {
        this.$store.commit("loadingCart", true);
        console.log(this.isLoadingCart);
        this.getCartItems();
      }
    } else {
      // Guest item found -  add it to the db
      this.$store.commit("loadingCart", true);

      this.updateCartItem(this.$store.getters.getGuestItem).then(() => {
        this.$store.commit("removeGuestItem");
        this.getCartItems();
      });
    }
  },
  computed: {
    ...mapGetters([
      "cartItems",
      "cartTotalPrice",
      "cartTotalItems",
      "isLoadingCart",
      "isCartEmpty",
    ]),

    totalPrice() {
      return Math.ceil(this.cartTotalPrice * 100) / 100;
    },
  },

  methods: {
    ...mapActions([
      "updateCartItem",
      "removeCartItem",
      "updateCartItem",
      "push_notification",
    ]),
    ImageURL(image) {
      return getImageUrl(image);
    },
    removeItem(cartItemId) {
      this.removeCartItem(cartItemId);
    },
    changeQuantity(event, cartItem) {
      this.updateCartItem({
        product_id: cartItem.product_id,
        quantity: parseInt(event.target.value),
        isAddToCart: false,
      });
    },
    calculateItemTotalPrice(itemQuantity, itemPrice) {
      return itemQuantity * itemPrice;
    },
    checkForm(e) {
      e.preventDefault();
    },
    getProductPageUrl(product_id) {
      this.$router.push(`/products/${product_id}`);
    },
    getCartItems() {
      this.$store
        .dispatch("getCartItems")
        .then(() => {})
        .catch(() => {
          this.push_notification({
            type: "error",
            message: "Could not load your cart. Please try again later.",
          });
        });
    },
    getImageUrl(image) {
      return process.env.VUE_APP_STORAGE + `/${image}`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cart {
  margin-top: 5rem;
}

a {
  cursor: pointer;
}
.remove-item-link {
  font-size: 0.7rem;
}
</style>
