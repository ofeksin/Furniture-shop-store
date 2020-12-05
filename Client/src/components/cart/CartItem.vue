<template>
  <div class="cart_item">
    {{ cartItem.name }}
    <b>price:</b> {{ cartItem.price }}$
    <input
      type="number"
      :value="cartItem.quantity"
      @input="changeQuantity($event)"
      min="1"
    />
    <button @click="removeItem">X</button>
    PRICE: {{ subtotal }}
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CartItem",
  props: {
    cartItem: Object,
  },
  data() {
    return {
      quantity: "",
    };
  },
  computed: {
    subtotal() {
      return this.cartItem.quantity * this.cartItem.price;
    },
  },
  watch: {},
  methods: {
    ...mapActions(["removeCartItem", "updateCartItem", "decrement"]),
    removeItem() {
      this.removeCartItem(this.cartItem.id);
    },
    changeQuantity(event) {
      console.log(`event ${event.target.value}`);
      this.updateCartItem({
        product_id: this.cartItem.product_id,
        quantity: parseInt(event.target.value),
        isAddToCart: false,
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
.cart_item {
  width: 100%;
  border: 1px solid red;
}
</style>
