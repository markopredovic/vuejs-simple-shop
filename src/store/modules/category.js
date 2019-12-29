import axios from "axios";

const state = {
  categories: []
};

const getters = {
  allCategories: state => state.categories
};

const actions = {
  async fetchCategories({ commit }) {
    const response = await axios.get(
      "https://react-simple-ecommerce-shop.firebaseio.com/categories.json"
    );
    console.log("CATEGORIES", response.data);
    commit("setCategories", response.data);
  }
  // async addTodo({ commit }, title) {
  //   const response = await axios.post(
  //     "https://jsonplaceholder.typicode.com/todos",
  //     {
  //       title,
  //       completed: false
  //     }
  //   );
  //   commit("newTodo", response.data);
  // },
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
};

const mutations = {
  setCategories: (state, categories) => (state.categories = categories)
  // newTodo: (state, todo) => state.todos.unshift(todo),
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
