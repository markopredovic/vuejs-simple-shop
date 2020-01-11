<template>
  <div class="l-page products">
    <div class="container">
      <AddProductForm />
      <ProductsList />
    </div>
  </div>
</template>

<script>
import ProductsList from "../components/Product/ProductsList";
import AddProductForm from "../components/Product/AddProductForm";
export default {
  name: "ProductPage",
  components: {
    ProductsList,
    AddProductForm
  }
};
</script>

<style>
</style>