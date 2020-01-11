<template>
  <div class="l-products-list">
    <table class="table table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Image</th>
          <th scopr="col">Category</th>
          <th scope="col">Price</th>
          <th scope="col">Description</th>
          <th class="text-center">Edit</th>
          <th class="text-center">Remove</th>
        </tr>
      </thead>
      <tbody>
        <ProductItem v-for="product in allProducts" :key="product.id" :product="product" />
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProductItem from "./ProductItem";

export default {
  name: "ProductsList",
  components: {
    ProductItem
  },
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