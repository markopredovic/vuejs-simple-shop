<template>
  <div class="l-add-category-form">
    <div class="l-action d-flex justify-content-end">
      <b-button v-b-modal.modal-1 variant="primary" class="text-white">Add Category</b-button>
    </div>

    <b-modal id="modal-1" title="Add Category" ok-only ok-title="Close">
      <form @submit="handleSubmit">
        <div class="form-group">
          <label for="categoryName">Category name</label>
          <input
            type="text"
            v-model="categoryName"
            class="form-control"
            id="categoryName"
            :class="{ isError: errors && errors.name}"
          />
          <small v-if="errors && errors.name" class="text-danger">{{ errors.name }}</small>
        </div>
        <div class="form-group">
          <label for="categoryDescription">Category description</label>
          <textarea
            v-model="categoryDescription"
            class="form-control"
            id="categoryDescription"
            rows="3"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary d-inline-flex align-items-center">
          <b-spinner small v-if="addLoading" class="mr-2"></b-spinner>Submit
        </button>
      </form>
    </b-modal>
  </div>
</template>

<script>
import uuid from "uuid";
import { mapActions } from "vuex";

export default {
  name: "AddCategoryForm",
  data() {
    return {
      categoryName: "",
      categoryDescription: "",
      errors: null,
      addLoading: false
    };
  },
  methods: {
    ...mapActions(["addCategory"]),
    async handleSubmit(e) {
      e.preventDefault();

      const _errors = this.validate();

      if (Object.keys(_errors).length === 0) {
        this.addLoading = true;
        this.errors = null;
        const newCategory = {
          id: uuid.v4(),
          name: this.categoryName,
          description: this.categoryDescription
        };

        await this.addCategory(newCategory);
        this.categoryName = "";
        this.categoryDescription = "";
        this.addLoading = false;
      } else {
        this.errors = _errors;
      }
    },
    validate() {
      let _errors = {};

      if (this.categoryName.trim() === "") {
        _errors.name = "Enter category name";
      }

      return _errors;
    }
  }
};
</script>

<style></style>