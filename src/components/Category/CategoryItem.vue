<template>
  <tr>
    <td>{{ category.name }}</td>
    <td>{{ category.description }}</td>
    <td class="text-center">
      <span @click="editMode = true" class="fa fa-edit text-edit"></span>
    </td>
    <td class="text-center">
      <span @click="handleDelete" class="fa fa-times text-danger"></span>
    </td>
    <EditCategoryModal v-if="editMode" :category="category" @modal-closed="handleModalClosed" />
    <AppSpinner v-if="loading" />
  </tr>
</template>

<script>
import { mapActions } from "vuex";
import EditCategoryModal from "./EditCategoryModal";

export default {
  name: "CategoryItem",
  data() {
    return {
      editMode: false,
      loading: false
    };
  },
  props: ["category"],
  components: {
    EditCategoryModal
  },
  methods: {
    ...mapActions(["deleteCategory"]),
    async handleDelete() {
      try {
        this.loading = true;
        await this.deleteCategory(this.category);
        this.loading = false;
      } catch (err) {
        console.log(err);
        // show error in Tosts message
      }
    },
    handleModalClosed() {
      this.editMode = false;
    }
  }
};
</script>

<style>
</style>