<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/logo.svg" alt="logo" />
      <h1>Pinia Tasks</h1>
    </header>

    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Fav tasks</button>
    </nav>

    <!-- loading -->
    <div class="loading" v-if="loading">Loading tasks...</div>

    <!-- task list -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ totalCount }} tasks left to do</p>
      <div v-for="task in tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ favCount }} favs left to do</p>
      <div v-for="task in favs" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <button @click="taskStore.$reset">Reset state</button>
  </main>
</template>

<script>
import { useTaskStore } from "./store/Taskstore";
import TaskDetails from "./components/TaskDetails.vue";
import { ref } from "vue";
import TaskForm from "./components/TaskForm.vue";
import { storeToRefs } from 'pinia';

export default {
  components: { TaskDetails, TaskForm },
  setup() {
    const taskStore = useTaskStore();

    const { favCount, favs, loading, tasks, totalCount } = storeToRefs(taskStore)

    // fetch tasks
    taskStore.getTasks();

    const filter = ref("all");

    return { favCount, favs, filter, loading, tasks, taskStore, totalCount  };
  },
};
</script>
