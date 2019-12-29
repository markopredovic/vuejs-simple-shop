<template>
  <tr>
    <td>{{ category.name }}</td>
    <td>{{ category.description }}</td>
    <td class="text-center">Edit</td>
    <td class="text-center">
      <span>&times;</span>
    </td>
  </tr>
</template>

<script>
export default {
  name: "CategoryItem",
  props: ["category"]
};
</script>

<style>
</style>