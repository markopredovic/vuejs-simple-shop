<template>
  <div class="l-edit-product">
    Edit product form
    <b-modal v-model="showModal" @hidden="handleModalClose">Hello From Modal!</b-modal>
  </div>
</template>

<script>
export default {
  name: "EditProductForm",
  props: ["showEditModal", "editProduct"],
  methods: {
    handleModalClose() {
      this.$emit("closeEditModal");
    }
  },
  computed: {
    showModal: {
      get: function() {
        return this.showEditModal;
      },
      set: function() {}
    }
  }
};
</script>
