<script setup>
import { ref, computed } from 'vue';
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useTaskStore } from "../store/task";
import { useUserStore } from "../store/user";


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


// function addTask() {
//   tasks.value.push({ 
//     id: id++, 
//     text: newTask.value, 
//     done: false })

//   newTask.value = ' '
// }

function removeTask(task) {
  tasks.value.splice(task, 1);
}

///// Edit task ////Not working///

// function editTask(index) {
//   task.value(index)  = newTask.value
//   tasks.value.splice(task, 1)

// }

//Setup ref to router(for Logout)
const router = useRouter()
const user = useUserStore()

//Log out function

async function logout(){
  await user.signOut();
  router.push ('/auth');
};

//To register a new task on Supabase & display

const storeTasks = useTaskStore();
const registeredTasks = ref ([]);

async function addTask() {
  await storeTasks.createTask(newTask.value);
  tasks.value.push({ 
   id: id++, 
   text: newTask.value, 
   done: false 
   })
 newTask.value = ' '
 storeTasks.fetchTasks();
  }

</script>


<template>
  <div>
      <!-- Add new task  -->
      <div v-for="task in registeredTasks" :key="task.id"></div>
    <input v-model="newTask">
    <button @click="addTask">Add New Task</button>    

 <!-- iterate through each task to add delete function , and update list by filtering   -->
    <div v-for="task in filteredTasks"  :key="task.id">
    <input type="checkbox" v-model = "task.done">
     <span :class ="{done: task.done }"> {{ task.text }}</span>

      <button @click="removeTask(index)">Delete </button>
    </div>

    <!-- Hide if completed, otherwise Show tasks -->
<div>
    <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? 'Show all tasks' : 'Hide completed' }}
  </button>
</div>
<!-- Edit task not working-->
<div>
  <button @submit.prevent="editTask(index)" class="">Edit task</button>
</div>
 

<!-- Logout -->
<div>
  <button @click="logout">Log Out

  </button>
  </div>
  </div>
 
</template>