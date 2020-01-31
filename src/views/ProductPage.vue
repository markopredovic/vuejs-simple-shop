<template>
  <div class="l-page products">
    <div class="container">
      <PageTitle title="Products" />
      <AddProductForm />
      <EditProductForm
        :showEditModal="showEditModal"
        :product="product"
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
import PageTitle from "../components/Title/PageTitle";

export default {
  name: "ProductPage",
  data() {
    return {
      showEditModal: false,
      product: null
    };
  },
  components: {
    ProductsList,
    AddProductForm,
    EditProductForm,
    PageTitle
  },
  methods: {
    handleShowEditModal(product) {
      this.product = product;
      this.showEditModal = true;
    },
    handleCloseEditModal() {
      this.showEditModal = false;
      this.product = null;
    }
  }
};
</script>

<style>
</style>