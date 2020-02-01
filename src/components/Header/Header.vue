<template>
  <header class="l-header">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">Simple e-commerce shop</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/categories">Categories</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/products">Products</router-link>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <b-dropdown class="m-2" right no-caret>
                <template v-slot:button-content>
                  <span class="fa fa-cart-plus"></span>
                  <span v-if="count > 0" class="minicart-count">{{count}}</span>
                  <span class="sr-only">Search</span>
                </template>
                <Minicart />
              </b-dropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import Minicart from "../Minicart/Minicart";
import { mapGetters } from "vuex";

export default {
  name: "Header",
  components: { Minicart },
  computed: mapGetters(["count"])
};
</script>
