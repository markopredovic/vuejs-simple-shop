<template>
  <div class="l-categories-list">
    <table class="table table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th class="text-center">Edit</th>
          <th class="text-center">Remove</th>
        </tr>
      </thead>
      <tbody>
        <CategoryItem
          v-for="category in allCategories"
          :key="category.id"
          :category="category"
          :allProducts="allProducts"
          v-on:deleteForbidden="$emit('deleteForbidden')"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import CategoryItem from "./CategoryItem";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "CategoriesList",
  components: {
    CategoryItem
  },
  methods: {
    ...mapActions(["fetchCategories", "fetchProducts"])
  },
  computed: mapGetters(["allCategories", "allProducts"]),
  created() {
    this.fetchCategories();
    this.fetchProducts();
  }
};
</script>
