<template>
  <div class="l-add-product">
    <div class="m-add-product">
      <div class="l-img">
        <img :src="product.productImageUrl" alt />
      </div>
      <div class="l-content">
        <h3>{{product && product.name}}</h3>
        <p>{{product && product.price}}</p>
      </div>
      <div class="l-action">
        <b-button variant="dark" class="btn-lg" @click="handleAddToCart">Add to Cart</b-button>
      </div>
    </div>
    <b-modal
      title="Add to Cart"
      v-model="isAddToCartModal"
      ok-only
      ok-title="Close"
      header-bg-variant="success"
      header-text-variant="light"
      hide-backdrop
    >Product "{{product.name}}" added to cart!</b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddProduct",
  data() {
    return {
      isAddToCartModal: false
    };
  },
  props: ["product"],
  methods: {
    ...mapActions(["addToCart"]),
    handleAddToCart() {
      try {
        this.addToCart(this.product);
        this.isAddToCartModal = true;
      } catch (e) {
        throw new Error("Add to cart error");
      }
    }
  }
};
</script>
