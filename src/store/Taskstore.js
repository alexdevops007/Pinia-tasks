import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [
      { id: 1, title: "Buy some milk", isFav: false },
      { id: 2, title: "Play Gloomhaven", isFav: true },
    ],
  }),
  getters: {
    favs: (state) => state.tasks.filter((t) => t.isFav),
    favCount: (state) => state.tasks.reduce((p, c) => (c.isFav ? p + 1 : p), 0),
    totalCount: (state) => state.tasks.length,
  },
  actions: {
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
