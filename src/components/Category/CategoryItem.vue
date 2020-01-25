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
  props: ["category", "allProducts"],
  components: {
    EditCategoryModal
  },
  methods: {
    ...mapActions(["deleteCategory"]),
    async handleDelete() {
      try {
        const _isAllowDelete = this._validateDelete();
        if (_isAllowDelete) {
          this.loading = true;
          await this.deleteCategory(this.category);
          this.loading = false;
        } else {
          this.$emit("deleteForbidden");
        }
      } catch (err) {
        // console.log(err);
      }
    },
    handleModalClosed() {
      this.editMode = false;
    },
    _validateDelete() {
      let _isAllowedDelete = true;

      const productsHasCurrentCategory = this.allProducts.filter(
        product => product.categoryId === this.category.id
      );

      _isAllowedDelete = productsHasCurrentCategory.length === 0;

      return _isAllowedDelete;
    }
  }
};
</script>
