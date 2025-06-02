<script setup>
import { ref, computed } from 'vue';
import { useTaskStore } from '@/store/taskStore.js';

const taskStore = useTaskStore();
const newTask = ref('');

// Exposing taskStore globally for debugging in DevTools
window.taskStore = taskStore;

// Computed: Filters tasks based on selection
const filteredTasks = computed(() =>
  taskStore.filter === 'all'
    ? taskStore.tasks
    : taskStore.tasks.filter(task =>
        taskStore.filter === 'completed' ? task.completed : !task.completed
      )
);
</script>

<template>
  <h1>Task List</h1>

  <!-- Filter Dropdown -->
  <select v-model="taskStore.filter">
    <option value="all">All</option>
    <option value="completed">Completed</option>
    <option value="pending">Pending</option>
  </select>

  <!-- Task Input & Add Button -->
  <input v-model="newTask" placeholder="Add a task" />
  <button @click="taskStore.addTask(newTask)">Add Task</button>

  <!-- Task List -->
  <ul>
  <li v-for="(task, index) in filteredTasks" :key="index">
    <!-- Show checkbox ONLY for pending tasks -->
    <template v-if="taskStore.filter !== 'completed'">
      <input type="checkbox" v-model="task.completed" @change="taskStore.toggleTask(index)" />
    </template>
    {{ task.text }}
    <button @click="taskStore.removeTask(index)">Remove</button>
  </li>
</ul>

</template>
