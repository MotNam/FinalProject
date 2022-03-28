<script setup>
import { ref } from 'vue';
import { supabase } from "../Supabase"
import { useTaskStore } from "../store/task";
import { useUserStore } from "../store/user";
import { useRouter } from "vue-router";

//To register a new task on Supabase & display
const newTask = ref("")
const allTasks = ref([])
const errorMsg = ref("")

const storeTasks = useTaskStore()
const user = useUserStore()
const router = useRouter()

async function fetchAllTasks(){
  const myList = await storeTasks.fetchTasks();
  allTasks.value = myList;
  console.log("hola");
}
fetchAllTasks();

async function addTask() {
  console.log('object');
  await storeTasks.createTask(newTask.value);
  await fetchAllTasks();
  newTask.value = ' ';
  }

///// Edit task ////
// function editTask(index) {
//   task.value(index)  = newTask.value
//   tasks.value.splice(task, 1)
// }

async function removeTask(task) {
  await storeTasks.deleteTask(task.id)
  await fetchAllTasks();
}

//Log out function
async function logout(){
  await user.signOut();
  router.push ('/auth');
};
</script>


<template>

<div class="md:flex min-h-screen p-20 bg-stone-300 h-full text-2xl text-gray-700 font-bold">
      <!-- Add new task  -->
      <div class="" v-for="task in allTasks" :key="task.id"></div>
    <input v-model="newTask"
    class="md:flex min-w-full p-4 rounded" 
    type="text"
    placeholder=" input task here "/>
    
    <div class="mb-5">
    <button @click="addTask" class="md:flex bg-gray-500 text-stone-200 p-4 rounded hover:text-yellow-200">+ Add</button>  
    </div>  
    

 <!-- show each task with delete function added -->
    <div v-for="task in allTasks"  :key="task.id">
    <input class="p-10" type="checkbox">
     <span class ="p-2">{{ task.title }}</span>


      <button @click ="removeTask(task.id)" class="p-5 text-xl font-thin hover:text-stone-200-bold">Delete task
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
  <button @click="editTask(index)" class="my-5">Edit task</button>
</div>

<!-- Logout -->
<div class="mt-20">
  <button @click="logout" class="text-gray-600 p-2 rounded hover:bg-gray-200 font-medium py-10">Log Out
</button>
  </div>
</div>

 
</template>