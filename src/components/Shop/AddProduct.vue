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
  </div>
</template>

<script>
export default {
  name: "AddProduct",
  props: ["product"],
  methods: {
    handleAddToCart() {
      alert("TODO: Add To Cart");
    }
  }
};
</script>

<style>
</style>