import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    pendingUpdates: [],
    filter: 'all', // 'all', 'completed', or 'pending'
  }),

  actions: {
    addTask(task) {
      this.tasks.push({ text: task, completed: false });
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },

    toggleTask(index) {
      console.log(`Marking task ${index} as completed`);

      this.tasks[index] = { ...this.tasks[index], completed: true }; // ✅ Always set to true
      this.tasks = [...this.tasks]; // 🔄 Ensure Vue detects the change

      localStorage.setItem('tasks', JSON.stringify(this.tasks)); // Persist changes
    },

    removeTask(index) {
      this.tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },

    setFilter(value) {
      this.filter = value;
    },
  },
});
