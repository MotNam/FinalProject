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
   });
 newTask.value = ' ';

  }

///// Edit task ////Not working///

// function editTask(index) {
//   task.value(index)  = newTask.value
//   tasks.value.splice(task, 1)

// }

async function removeTask(task) {
  await storeTasks.deleteTask(newTask.value)
  tasks.value.splice(task, 1);
}

</script>


<template>

  <div class=" md:flex min-h-screen p-20 bg-stone-300 h-full text-2xl text-gray-700 font-bold ">
      <!-- Add new task  -->
      <div v-for="task in registeredTasks" :key="task.id"></div>
    <input class="md:flex min-w-full p-4" v-model="newTask">
    <div class="mb-5">
    <button @click="addTask" class="md:flex bg-gray-500 text-stone-200 p-4 hover:text-white">+ New Task</button>  
    </div>  

 <!-- iterate through each task to add delete function , and update list by filtering   -->
    <div v-for="task in filteredTasks"  :key="task.id">
    <input class="p-10" type="checkbox" v-model = "task.done">
     <span :class ="{done: task.done }"> {{ task.text }}</span>

      <button @click="removeTask(task.id)" class="p-5 text-xl font-thin hover:text-stone-200-bold">Delete task
      </button>
    </div>

    <!-- Hide if completed, otherwise Show tasks -->
<div class="mt-20">
    <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? 'Show all tasks' : 'Hide completed' }}
  </button>
</div>
<!-- Edit task not working-->
<div>
  <button @submit.prevent="editTask(index)" class="my-5">Edit task</button>
</div>
 

<!-- Logout -->
<div class="mt-20">
  <button @click="logout" class="text-gray-600 p-2 rounded hover:bg-gray-200 font-medium py-10">Log Out
</button>

  </div>
  </div>
 
</template>