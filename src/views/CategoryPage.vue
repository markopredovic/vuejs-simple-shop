<template>
  <div class="l-category-page">
    <div class="container">
      <AddCategoryForm />
      <CategoriesList />
    </div>
  </div>
</template>

<script>
import CategoriesList from "../components/Category/CategoriesList";
import AddCategoryForm from "../components/Category/AddCategoryForm";

export default {
  components: {
    CategoriesList,
    AddCategoryForm
  }
};
</script>

<style>
</style>
