<script setup>
import { ref, computed } from 'vue'

// give each task a unique id
let id = 0
// Define new task 
const newTask = ref(' ')

//Define hideCompleted initial status
const hideCompleted = ref(false)

//Define the result of new added tasks, ie.tasks
const tasks = ref([])
const filteredTasks = computed(() => {
  // return filtered tasks based on tasks.value & hideCompleted.value
   return hideCompleted.value
    ? tasks.value.filter((t) => !t.done)
    : tasks.value
})
function addTask() {
  tasks.value.push({ 
    id: id++, 
    text: newTask.value, 
    done: false })

  newTask.value = ' '
}

function removeTask(task) {
  tasks.value.splice(task, 1);
}
</script>

<template>
  <div>
      <!-- Add new task  -->
     <form @submit.prevent="addTask">
    <input v-model="newTask">
    <button>Add New Task</button>    
  </form>
 
 <!-- iterate through each task to add delete function , and update list by filtering &   -->
    <div v-for= "task in filteredTasks" :key="task.id">
    <input type="checkbox" v-model = "task.done">
     <span :class ="{done: task.done }"> {{ task.text }}</span>

      <button @click="removeTask(task)">Delete </button>
    </div>

    <!-- Hide if completed, otherwise Show tasks -->

    <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? 'Show all tasks' : 'Hide completed' }}
  </button>
  </div>
 
</template>