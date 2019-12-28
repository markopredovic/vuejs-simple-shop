<template>
  <div class="l-categories-list">
    <div v-for="category in allCategories" :key="category.id">{{ category.name }}</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Todos",
  methods: {
    ...mapActions(["fetchCategories"])
  },
  computed: mapGetters(["allCategories"]),
  created() {
    this.fetchCategories();
  }
};
</script>
