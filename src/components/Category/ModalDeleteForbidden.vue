<template>
  <b-modal
    id="my-modal"
    title="Category Delete"
    ok-only
    v-model="show"
    @hidden="closeModal"
  >Delete Forbidden!</b-modal>
</template>

<script>
export default {
  name: "ModalDeleteForbidden",
  data() {
    return {
      show: true
    };
  },
  props: ["closeModal"]
};
</script>