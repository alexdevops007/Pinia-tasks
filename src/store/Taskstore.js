import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    loading: false,
  }),
  getters: {
    favs: (state) => state.tasks.filter((t) => t.isFav),
    favCount: (state) => state.tasks.reduce((p, c) => (c.isFav ? p + 1 : p), 0),
    totalCount: (state) => state.tasks.length,
  },
  actions: {
    async getTasks() {
      this.loading = true;

      const response = await fetch("http://localhost:3000/tasks");
      const data = await response.json();

      this.tasks = data;
      this.loading = false;
    },
    addTask(task) {
      this.tasks.push(task);
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },
    toggleTask(id) {
      const task = this.tasks.find((t) => t.id === id);
      task.isFav = !task.isFav;
    },
  },
});
