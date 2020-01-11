import axios from "axios";

const FIREBASE_BASE_URL = "https://react-simple-ecommerce-shop.firebaseio.com";

const state = {
  products: [],
  categories: []
};

const getters = {
  allProducts: state => state.products
};

const actions = {
  async fetchProducts({ commit }) {
    const response = await axios.get(`${FIREBASE_BASE_URL}/products.json`);
    console.log("FETCH PRODUCT", response);
    commit("setProducts", response.data ? response.data : {});
  },
  async addProduct({ commit }, product) {
    console.log("PRODUCT", product);
    const response = await axios.post(`${FIREBASE_BASE_URL}/products.json`, {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      categoryId: product.categoryId,
      categoryName: product.categoryName
    });

    if (response.statusText === "OK") {
      const addProduct = {
        ...product,
        db_node_name: response.data.name
      };

      console.log("ADD PRODUCT RESPONSE", addProduct);

      commit("addProduct", addProduct);
    } else {
      throw new Error("add product error");
    }
  },
  async deleteProduct({ commit }, product) {
    const response = await axios.delete(
      `${FIREBASE_BASE_URL}/products/${product.db_node_name}.json`
    );
    if (response.statusText === "OK") {
      commit("removeProduct", product);
    } else throw new Error("delete product error");
  }
};

const mutations = {
  setProducts: (state, productsObj) => {
    let updatedProducts = Object.keys(productsObj).map(el => {
      const updatedEl = {
        ...productsObj[el],
        db_node_name: el
      };
      return updatedEl;
    });
    state.products = updatedProducts;
  },
  addProduct: (state, addProduct) => {
    state.products.push(addProduct);
  },
  removeProduct: (state, deletedProduct) => {
    let updatedProducts = state.products.filter(
      product => product.id !== deletedProduct.id
    );
    state.products = updatedProducts;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
