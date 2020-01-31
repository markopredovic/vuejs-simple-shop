<template>
  <div class="l-shop">
    <AddProduct v-for="product in allProducts" :product="product" :key="product.id" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AddProduct from "./AddProduct";

export default {
  name: "ShopList",
  components: { AddProduct },
  methods: {
    ...mapActions(["fetchProducts"])
  },
  computed: mapGetters(["allProducts"]),
  created() {
    this.fetchProducts();
  }
};
</script>

<style>
</style>