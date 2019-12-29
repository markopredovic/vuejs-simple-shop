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
        <CategoryItem v-for="category in allCategories" :key="category.id" :category="category" />
      </tbody>
    </table>
  </div>
</template>

<script>
import CategoryItem from "./CategoryItem";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Todos",
  components: {
    CategoryItem
  },
  methods: {
    ...mapActions(["fetchCategories"])
  },
  computed: mapGetters(["allCategories"]),
  created() {
    this.fetchCategories();
  }
};
</script>
