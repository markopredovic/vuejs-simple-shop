<template>
  <div class="l-edit-category">
    <b-modal
      v-model="show"
      id="editCategory"
      title="Edit Category"
      ok-only
      ok-title="Close"
      @hide="closeModal"
    >
      <form @submit="handleSubmit">
        <div class="form-group">
          <label for="categoryName">Category name</label>
          <input
            type="text"
            v-model="name"
            class="form-control"
            id="categoryName"
            :class="{ isError: errors && errors.name}"
          />
          <small v-if="errors && errors.name" class="text-danger">{{ errors.name }}</small>
        </div>
        <div class="form-group">
          <label for="categoryDescription">Category description</label>
          <textarea v-model="description" class="form-control" id="categoryDescription" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-primary d-inline-flex align-items-center">
          <b-spinner small v-if="editLoading" class="mr-2"></b-spinner>Submit
        </button>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "EditCategoryModal",
  data() {
    return {
      show: true,
      errors: null,
      editLoading: false,
      name: this.category.name,
      description: this.category.description
    };
  },
  props: ["category"],
  methods: {
    ...mapActions(["updateCategory"]),
    async handleSubmit(e) {
      e.preventDefault();
      try {
        const _errors = this.validate();
        if (Object.keys(_errors).length === 0) {
          this.errors = null;
          this.editLoading = true;
          const updatedCategory = {
            id: this.category.id,
            db_node_name: this.category.db_node_name,
            name: this.name,
            description: this.description
          };

          await this.updateCategory(updatedCategory);
          this.editLoading = false;
        } else {
          this.errors = _errors;
        }
      } catch (err) {
        console.log(err);
      }
    },
    validate() {
      let _errors = {};

      if (this.name.trim() === "") {
        _errors.name = "Enter category name";
      }

      return _errors;
    },
    mounted() {
      this.$root.$on("bv::modal::show", (bvEvent, modalId) => {
        console.log("Modal is about to be shown", bvEvent, modalId);
      });
      this.$root.$on("bv::modal::hide", (bvEvent, modalId) => {
        console.log("Modal is about to be hidden", bvEvent, modalId);
      });
    },
    closeModal() {
      this.show = false;
      this.$emit("modal-closed");
    }
  }
};
</script>

<style>
</style>

// TODO:
// handle modal close
// emit modal closed event to parent