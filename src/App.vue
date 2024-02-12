<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/logo.svg" alt="logo" />
      <h1>Pinia Tasks</h1>
    </header>

    <!-- task list -->
    <div class="task-list">
      <div v-for="task in taskStore.tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script>
import { useTaskStore } from "./store/Taskstore";
import TaskDetails from "./components/TaskDetails.vue";

export default {
  components: { TaskDetails },
  setup() {
    const taskStore = useTaskStore();

    return { taskStore };
  },
};
</script>
