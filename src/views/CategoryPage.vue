<template>
  <div class="l-category-page">
    <div class="container">
      <AddCategoryForm />
      <CategoriesList v-on:deleteForbidden="isDeleteAllowed = false" />
      <ModalDeleteForbidden v-if="!isDeleteAllowed" :closeModal="handleCloseModal" />
    </div>
  </div>
</template>

<script>
import CategoriesList from "../components/Category/CategoriesList";
import AddCategoryForm from "../components/Category/AddCategoryForm";
import ModalDeleteForbidden from "../components/Category/ModalDeleteForbidden";

export default {
  name: "CategoryPage",
  data() {
    return {
      isDeleteAllowed: true
    };
  },
  components: {
    CategoriesList,
    AddCategoryForm,
    ModalDeleteForbidden
  },
  methods: {
    handleCloseModal() {
      this.isDeleteAllowed = true;
    }
  }
};
</script>

