<template>
  <div class="l-category-page">
    <div class="container">
      <PageTitle title="Categories" />
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
import PageTitle from "../components/Title/PageTitle";

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
    ModalDeleteForbidden,
    PageTitle
  },
  methods: {
    handleCloseModal() {
      this.isDeleteAllowed = true;
    }
  }
};
</script>

