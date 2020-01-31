import * as utility from "../../helpers/utility";

const state = {
  cart: []
};

const getters = {
  allCartProducts: state => state.cart
};

const actions = {
  getCart({ commit }) {
    const cart = utility.getSessionStorageItem("cart");
    console.log("get cart", cart);
    commit("setCart", cart);
  },
  addToCart({ commit }, product) {
    const cart = utility.getSessionStorageItem("cart");
    let updatedCart = [];

    console.log("add to cart", cart);

    if (cart.filter(el => el.id === product.id).length > 0) {
      updatedCart = cart.map(el => {
        if (el.id === product.id) {
          return {
            ...el,
            qty: el.qty + 1
          };
        } else {
          return el;
        }
      });
    } else {
      updatedCart = [...cart, { ...product, qty: 1 }];
    }

    console.log("add to cart", updatedCart);

    utility.setSessionStorageItem("cart", updatedCart);

    commit("addToCart", product);
  },
  removeCartItem({ commit }, id) {
    const cart = utility.getSessionStorageItem("cart");
    let updatedCart = cart.filter(el => el.id !== id);
    utility.setSessionStorageItem("cart", updatedCart);

    commit("removeCartItem", id);
  }
};

const mutations = {
  addToCart: (state, product) => {
    console.log("state", state);
    if (state.cart.filter(el => el.id === product.id).length > 0) {
      state.cart = state.cart.map(el => {
        if (el.id === product.id) {
          return {
            ...el,
            qty: el.qty + 1
          };
        } else {
          return el;
        }
      });
    } else {
      state.cart.push({ ...product, qty: 1 });
    }
  },
  setCart: (state, cart) => {
    state.cart = cart;
  },
  removeCartItem: (state, id) => {
    let updatedCart = state.cart.filter(el => el.id !== id);
    state.cart = [...updatedCart];
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
