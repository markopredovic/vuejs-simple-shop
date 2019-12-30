import axios from "axios";

const FIREBASE_BASE_URL = "https://react-simple-ecommerce-shop.firebaseio.com";

const state = {
  categories: []
};

const getters = {
  allCategories: state => state.categories
};

const actions = {
  async fetchCategories({ commit }) {
    const response = await axios.get(`${FIREBASE_BASE_URL}/categories.json`);
    commit("setCategories", response.data);
  },
  async addCategory({ commit }, category) {
    const response = await axios.post(`${FIREBASE_BASE_URL}/categories.json`, {
      id: category.id,
      name: category.name,
      description: category.description
    });

    const newCategory = { ...category, db_node_name: response.data.name };

    commit("addCategory", newCategory);
  },
  async deleteCategory({ commit }, category) {
    await axios.delete(
      `${FIREBASE_BASE_URL}/categories/${category.db_node_name}.json`
    );
    commit("removeCategory", category);
  },
  async updateCategory({ commit }, updatedCategory) {
    await axios.put(
      `${FIREBASE_BASE_URL}/categories/${updatedCategory.db_node_name}.json`,
      updatedCategory
    );
    commit("updateCategory", updatedCategory);
  }
};

const mutations = {
  setCategories: (state, categoriesObj) => {
    let updatedCategories = Object.keys(categoriesObj).map(el => {
      const updatedEl = {
        ...categoriesObj[el],
        db_node_name: el
      };
      return updatedEl;
    });
    state.categories = updatedCategories;
  },
  addCategory: (state, category) => {
    state.categories.push(category);
  },
  removeCategory: (state, category) => {
    const _index = state.categories.findIndex(el => el.id === category.id);
    state.categories.splice(_index, 1);
  },
  updateCategory: (state, category) => {
    const _index = state.categories.findIndex(el => el.id === category.id);
    state.categories.splice(_index, 1, category);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
