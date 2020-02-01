<template>
  <div class="l-minicart">
    <div v-if="allCartProducts.length" class="l-content">
      <div v-for="item in allCartProducts" :key="item.id" class="l-minicart-item">
        <div class="m-minicart-item">
          <div class="l-img">
            <img :src="item.productImageUrl" alt />
          </div>
          <div class="l-inner-content">
            <h3>{{item.name}}</h3>
            <p>{{item.price}}$</p>
            <p>Qty: {{item.qty}}</p>
          </div>
          <div class="l-action">
            <button class="btn btn-danger" @click="handleRemoveCartItem(item.id)">
              <span class="fa fa-times"></span>
            </button>
          </div>
        </div>
      </div>
      <div class="l-minicart-total">Total: {{total}}</div>
      <div class="l-minicart-checkout">
        <router-link to="/checkout" class="btn btn-dark text-white btn-lg btn-block">Go to Checkout</router-link>
      </div>
    </div>
    <div v-else>
      <div class="empty-cart">Empty cart</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Minicart",
  methods: {
    ...mapActions(["getCart", "removeCartItem"]),
    handleRemoveCartItem(id) {
      this.removeCartItem(id);
    }
  },
  computed: mapGetters(["allCartProducts", "total"]),
  created() {
    this.getCart();
  }
};
</script>

<style>
</style>