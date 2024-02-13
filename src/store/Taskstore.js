import { defineStore } from "pinia";

const API_URL = "http://localhost:3000/tasks";

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

      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        this.tasks = data;
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        this.loading = false;
      }
    },
    async addTask(task) {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          body: JSON.stringify(task),
          headers: { "Content-Type": "application/json" },
        });

        if (response.error) {
          console.error(response.error);
        } else {
          this.tasks.push(task);
        }
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },
    async deleteTask(id) {
      try {
        await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });

        this.tasks = this.tasks.filter((t) => t.id !== id);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },
    async toggleTask(id) {
      try {
        const task = this.tasks.find((t) => t.id === id);
        task.isFav = !task.isFav;

        const response = await fetch(`${API_URL}/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ isFav: task.isFav }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.error) {
          console.error(response.error);
        }
      } catch (error) {
        console.error("Error toggling task:", error);
      }
    },
  },
});
