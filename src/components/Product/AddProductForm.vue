<template>
  <div class="l-add-product-form">
    <div class="l-action d-flex justify-content-end mb-5">
      <button class="btn btn-primary text-white" v-b-modal="'my-modal'">Add Product</button>
    </div>
    <div class="l-add-product-modal">
      <b-modal id="my-modal" ok-only title="Add Product">
        <form @submit="handleAddProduct">
          <div class="form-group">
            <label for="productName">Product Name:</label>
            <input type="text" class="form-control" id="productName" v-model="productName" />
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
          </div>
          <div class="form-group">
            <label for="productPrice">Product Price:</label>
            <input type="text" class="form-control" v-model="productPrice" id="productPrice" />
          </div>
          <div class="form-group">
            <label for="productDescription">Example textarea</label>
            <textarea
              class="form-control"
              v-model="productDescription"
              id="productDescription"
              rows="3"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary text-white">Add</button>
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
      productDescription: ""
    };
  },
  methods: {
    ...mapActions(["addProduct", "fetchCategories"]),
    handleAddProduct(e) {
      e.preventDefault();

      const addProduct = {
        id: uuid.v4(),
        name: this.productName,
        price: this.productPrice,
        description: this.productDescription,
        categoryId: this.productCategoryId,
        categoryName: this.productCategoryName
      };
      this.addProduct(addProduct);
    },
    handleCategoryChange(e) {
      console.log("category changed", e.target.value);
      const selectBox = document.getElementById("productCategory");
      this.productCategoryName =
        selectBox.options[selectBox.selectedIndex].text;
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