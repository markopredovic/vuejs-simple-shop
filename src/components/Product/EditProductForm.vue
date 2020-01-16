<template>
  <div class="l-edit-product">
    Edit product form
    <b-modal v-model="showModal" @hidden="handleModalClose">
      <form @submit="handleEditProduct">
        <div class="form-group">
          <label for="productName">Product Name:</label>
          <input
            type="text"
            :value="updateProduct ? updateProduct.name : ''"
            @change="handleNameChange"
            class="form-control"
            id="productName"
          />
        </div>
        <div class="form-group">
          <label for="productCategory">Product Category:</label>
          <select
            class="form-control"
            :value="updateProduct ? updateProduct.categoryId : null"
            @change="handleCategoryChanged"
            id="productCategory"
          >
            <option value disabled selected>Select Category</option>
            <option
              v-for="category in allCategories"
              :key="category.id"
              :value="category.id"
            >{{ category.name }}</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Edit</button>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "EditProductForm",
  props: ["showEditModal", "product"],
  data() {
    return {
      updateProduct: null
    };
  },
  methods: {
    ...mapActions(["editProduct"]),
    handleModalClose() {
      this.$emit("closeEditModal");
    },
    handleEditProduct(e) {
      e.preventDefault();
      this.editProduct(this.updateProduct);
    },
    handleNameChange(e) {
      console.log(e.target.value);
      this.updateProduct.name = e.target.value;
    },
    handleCategoryChanged(e) {
      const selectBox = document.getElementById("productCategory");

      this.updateProduct.categoryId = e.target.value;
      this.updateProduct.categoryName =
        selectBox.options[selectBox.selectedIndex].text;
    }
  },
  computed: {
    showModal: {
      get: function() {
        return this.showEditModal;
      },
      set: function() {}
    },
    ...mapGetters(["allCategories"])
  },
  updated() {
    if (!this.updateProduct) {
      this.updateProduct = this.product ? { ...this.product } : null;
    }
  }
};
</script>
