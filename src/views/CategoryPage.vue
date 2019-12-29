<template>
  <div class="l-category-page">
    <div class="container">
      <h1>All categories</h1>
      <CategoriesList />
    </div>
  </div>
</template>

<script>
import CategoriesList from "../components/Category/CategoriesList";
export default {
  components: {
    CategoriesList
  }
};
</script>

<style>
</style>
