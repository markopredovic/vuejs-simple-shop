<template>
  <div class="l-page products">
    <div class="container">
      <AddProductForm />
      <EditProductForm
        :showEditModal="showEditModal"
        :editProduct="editProduct"
        v-on:closeEditModal="handleCloseEditModal"
      />
      <ProductsList v-on:editProduct="handleShowEditModal" />
    </div>
  </div>
</template>

<script>
import ProductsList from "../components/Product/ProductsList";
import AddProductForm from "../components/Product/AddProductForm";
import EditProductForm from "../components/Product/EditProductForm";

export default {
  name: "ProductPage",
  data() {
    return {
      showEditModal: false,
      editProduct: null
    };
  },
  components: {
    ProductsList,
    AddProductForm,
    EditProductForm
  },
  methods: {
    handleShowEditModal(product) {
      console.log("handleShowEditModal");
      this.editProduct = product;
      this.showEditModal = true;
    },
    handleCloseEditModal() {
      this.showEditModal = false;
      this.editProduct = null;
    }
  }
};
</script>

<style>
</style>