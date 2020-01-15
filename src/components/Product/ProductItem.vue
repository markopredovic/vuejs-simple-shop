<template>
  <tr>
    <td>{{ product.name }}</td>
    <td>
      <img :src="product.productImageUrl" alt width="80px" />
    </td>
    <td>{{ product.categoryName }}</td>
    <td>{{ product.price }}</td>
    <td>{{ product.description }}</td>
    <td class="text-center h4">
      <span @click="$emit('editProduct', editProduct)" class="fa fa-edit text-edit"></span>
    </td>
    <td class="text-center h4">
      <span @click="handleDelete" class="fa fa-times text-danger"></span>
    </td>
  </tr>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ProductItem",
  data() {
    return {
      editProduct: this.product
    };
  },
  props: ["product"],
  methods: {
    ...mapActions(["deleteProduct"]),
    handleDelete() {
      this.deleteProduct(this.product);
    }
  }
};
</script>

<style>
</style>