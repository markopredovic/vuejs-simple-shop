<template>
  <div class="l-edit-product">
    <b-modal
      v-model="showModal"
      ok-only
      title="Edit Product"
      ok-title="Close"
      @hidden="handleModalClose"
    >
      <b-alert v-model="showProductUpdatedAlert" variant="info">Product Updated!</b-alert>
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
          <small class="text-danger" v-if="errors && errors.name">{{errors.name}}</small>
        </div>
        <div class="form-group l-product-image">
          <label>Product Image:</label>
          <div v-if="updateProduct && updateProduct.productImageUrl" class="l-img">
            <img :src="updateProduct.productImageUrl" alt width="50px" style="margin-right: 4px" />
            <span class="fa fa-times-circle text-danger l-img-delete" @click="handleDeleteImage"></span>
          </div>
          <input
            v-else
            type="file"
            class="form-control-file"
            name="product-image"
            @change="handleProductImage"
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
          <small class="text-danger" v-if="errors && errors.category">{{errors.category}}</small>
        </div>
        <div class="form-group">
          <label for="productPrice">Product Price:</label>
          <input
            type="text"
            :value="updateProduct ? updateProduct.price : ''"
            @change="handlePriceChange"
            class="form-control"
            id="productPrice"
          />
          <small class="text-danger" v-if="errors && errors.price">{{errors.price}}</small>
        </div>
        <div class="form-group">
          <label for="productDescription">Product Description:</label>
          <textarea
            class="form-control"
            :value="updateProduct ? updateProduct.description : ''"
            @change="handleDescriptionChange"
            id="productDescription"
            rows="3"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary text-white">
          <b-spinner small v-if="showLoader" class="mr-2"></b-spinner>Edit
        </button>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { storage } from "../../firebase";

export default {
  name: "EditProductForm",
  props: ["showEditModal", "product"],
  data() {
    return {
      updateProduct: null,
      errors: {},
      showLoader: false,
      showProductUpdatedAlert: false,
      uploadError: false
    };
  },
  methods: {
    ...mapActions(["editProduct"]),
    handleModalClose() {
      this.$emit("closeEditModal");
    },
    async handleEditProduct(e) {
      e.preventDefault();

      this.errors = this._validate();

      if (Object.keys(this.errors).length === 0) {
        this.showLoader = true;

        if (this.updateProduct.productImageFile) {
          const uploadTask = storage
            .ref(`images/${this.updateProduct.productImageFile.name}`)
            .put(this.updateProduct.productImageFile);

          uploadTask.on(
            "state_changed",
            () => {},
            error => {
              this.uploadError = error;
            },
            () => {
              // complete function ....
              storage
                .ref("images")
                .child(this.updateProduct.productImageFile.name)
                .getDownloadURL()
                .then(url => {
                  const editProduct = {
                    ...this.updateProduct,
                    productImageUrl: url
                  };
                  this.editProduct(editProduct);
                  this.showLoader = false;
                  this.showProductUpdatedAlert = true;
                });
            }
          );
        } else {
          await this.editProduct(this.updateProduct);
          this.showLoader = false;
          this.showProductUpdatedAlert = true;
        }
      }
    },
    _validate() {
      let _errors = {};

      if (!this.updateProduct.name || this.updateProduct.name.trim() === "") {
        _errors.name = "Enter product name";
      }
      if (!this.updateProduct.price || this.updateProduct.price === "") {
        _errors.price = "Enter product price";
      }
      if (
        !this.updateProduct.categoryName ||
        this.updateProduct.categoryName === ""
      ) {
        _errors.categoryName = "Selcect product category";
      }

      return _errors;
    },
    handleNameChange(e) {
      this.updateProduct.name = e.target.value;
    },
    handleCategoryChanged(e) {
      const selectBox = document.getElementById("productCategory");

      this.updateProduct.categoryId = e.target.value;
      this.updateProduct.categoryName =
        selectBox.options[selectBox.selectedIndex].text;
    },
    handleProductImage(e) {
      this.updateProduct.productImageFile = e.target.files[0];
    },
    handlePriceChange(e) {
      this.updateProduct.price = e.target.value;
    },
    handleDescriptionChange(e) {
      this.updateProduct.description = e.target.value;
    },
    handleDeleteImage() {
      this.updateProduct.productImageUrl = null;
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

<style scope>
.l-img-delete {
  cursor: pointer;
  vertical-align: top;
}
</style>
