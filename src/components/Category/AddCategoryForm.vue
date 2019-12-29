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
          <span v-if="errors && errors.name" style="font-size: 1rem; color: red">{{ errors.name }}</span>
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
        <button type="submit" class="btn btn-primary">Submit</button>
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
      errors: null
    };
  },
  methods: {
    ...mapActions(["addCategory"]),
    handleSubmit(e) {
      e.preventDefault();

      const _errors = this.validate();

      if (Object.keys(_errors).length === 0) {
        this.errors = null;
        const newCategory = {
          id: uuid.v4(),
          name: this.categoryName,
          description: this.categoryDescription
        };

        this.addCategory(newCategory);
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