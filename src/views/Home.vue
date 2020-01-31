<template>
  <div class="home">
    <div class="container">
      <PageTitle title="Shop" />
      <ShopList />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import PageTitle from "../components/Title/PageTitle";
import ShopList from "../components/Shop/ShopList";

export default {
  name: "home",
  components: { PageTitle, ShopList }
};
</script>
