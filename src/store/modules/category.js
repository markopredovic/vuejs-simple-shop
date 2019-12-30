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
    console.log("CATEGORIES", response.data);
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
  }
  // deleteTodo: (state, id) =>
  //   (state.todos = state.todos.filter(todo => todo.id !== id)),
  // updateTodo: (state, todo) => {
  //   const _index = state.todos.findIndex(el => el.id === todo.id);
  //   state.todos.splice(_index, 1, todo);
  // }
};

export default {
  state,
  getters,
  actions,
  mutations
};

// async deleteTodo({ commit }, id) {
//   await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
//   commit("deleteTodo", id);
// },
// async filterTodos({ commit }, e) {
//   const _limit = parseInt(
//     e.target.options[e.target.options.selectedIndex].innerText
//   );
//   const response = await axios.get(
//     `https://jsonplaceholder.typicode.com/todos?_limit=${_limit}`
//   );
//   commit("setTodos", response.data);
// },
// async updateTodo({ commit }, todo) {
//   const response = await axios.put(
//     `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
//     todo
//   );
//   window.console.log(response.data);
//   commit("updateTodo", response.data);
// }
