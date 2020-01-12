<template>
  <div class="l-add-product-form">
    <div class="l-action d-flex justify-content-end mb-5">
      <button class="btn btn-primary text-white" v-b-modal="'my-modal'">Add Product</button>
    </div>
    <div class="l-add-product-modal">
      <b-modal id="my-modal" ok-only title="Add Product" ok-title="Close" @hidden="resetModal">
        <b-alert v-model="showProductAddedAlert" variant="success">Success Alert</b-alert>
        <form @submit="handleAddProduct">
          <div class="form-group">
            <label for="productName">Product Name:</label>
            <input type="text" class="form-control" id="productName" v-model="productName" />
            <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
          </div>
          <div class="form-group">
            <label for="productCategory">Product Category:</label>
            <select
              class="form-control"
              v-model="productCategoryId"
              @change="handleCategoryChange"
              id="productCategory"
            >
              <option value disabled selected>Select Category</option>
              <option
                v-for="category in allCategories"
                :key="category.id"
                :value="category.id"
              >{{ category.name }}</option>
            </select>
            <small v-if="errors.categoryName" class="text-danger">{{ errors.categoryName }}</small>
          </div>
          <div class="form-group">
            <label for="productPrice">Product Price:</label>
            <input type="text" class="form-control" v-model="productPrice" id="productPrice" />
            <small v-if="errors.price" class="text-danger">{{ errors.price }}</small>
          </div>
          <div class="form-group">
            <label for="productDescription">Product Description:</label>
            <textarea
              class="form-control"
              v-model="productDescription"
              id="productDescription"
              rows="3"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary text-white">
            <b-spinner small v-if="addLoading" class="mr-2"></b-spinner>Add
          </button>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import uuid from "uuid";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AddProductForm",
  data() {
    return {
      productName: "",
      productCategoryName: "",
      productCategoryId: null,
      productPrice: null,
      productDescription: "",
      errors: {},
      addLoading: false,
      showProductAddedAlert: false
    };
  },
  methods: {
    ...mapActions(["addProduct", "fetchCategories"]),
    async handleAddProduct(e) {
      e.preventDefault();

      this.errors = this._validate();

      if (Object.keys(this.errors).length === 0) {
        this.addLoading = true;
        const addProduct = {
          id: uuid.v4(),
          name: this.productName,
          price: this.productPrice,
          description: this.productDescription,
          categoryId: this.productCategoryId,
          categoryName: this.productCategoryName
        };
        await this.addProduct(addProduct);
        this.addLoading = false;
        this.showProductAddedAlert = true;
      }
    },
    handleCategoryChange(e) {
      console.log("category changed", e.target.value);
      const selectBox = document.getElementById("productCategory");
      this.productCategoryName =
        selectBox.options[selectBox.selectedIndex].text;
    },
    _validate() {
      let _errors = {};

      if (!this.productName || this.productName.trim() === "") {
        _errors.name = "Enter product name";
      }
      if (!this.productPrice || this.productPrice.trim() === "") {
        _errors.price = "Enter product price";
      }
      if (!this.productCategoryName || this.productCategoryName.trim() === "") {
        _errors.categoryName = "Selcect product category";
      }

      return _errors;
    },
    resetModal() {
      this.productName = "";
      this.productCategoryName = "";
      this.productCategoryId = null;
      this.productPrice = null;
      this.showProductAddedAlert = false;
      this.productDescription = "";
      this.errors = {};
    }
  },
  computed: mapGetters(["allCategories"]),
  created() {
    this.fetchCategories();
  }
};
</script>

<style>
</style>