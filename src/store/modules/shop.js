import * as utility from "../../helpers/utility";

const state = {
  cart: []
};

const getters = {
  allCartProducts: state => state.cart,
  total: state =>
    state.cart.reduce(
      (acc, current) => parseInt(acc + parseInt(current.price)),
      0
    ),
  count: state => state.cart.length
};

const actions = {
  getCart({ commit }) {
    const cart = utility.getSessionStorageItem("cart");
    commit("setCart", cart);
  },
  addToCart({ commit }, product) {
    const cart = utility.getSessionStorageItem("cart");
    let updatedCart = [];

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
