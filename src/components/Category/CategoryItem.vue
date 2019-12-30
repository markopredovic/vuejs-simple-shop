<template>
  <tr>
    <td>{{ category.name }}</td>
    <td>{{ category.description }}</td>
    <td class="text-center">
      <span class="fa fa-edit text-edit"></span>
    </td>
    <td class="text-center">
      <span @click="handleDelete" class="fa fa-times text-danger"></span>
    </td>
  </tr>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CategoryItem",
  props: ["category"],
  methods: {
    ...mapActions(["deleteCategory"]),
    handleDelete() {
      this.deleteCategory(this.category);
    }
  }
};
</script>

<style>
</style>