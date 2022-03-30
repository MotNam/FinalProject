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
const nowEditing = ref(false);

const storeTasks = useTaskStore();
const user = useUserStore();
const router = useRouter();

async function fetchAllTasks(){
  allTasks.value = await storeTasks.fetchTasks();
  console.log(allTasks.value)
};

fetchAllTasks();

async function addTask() {  
  await storeTasks.createTask(newTask.value);
  await fetchAllTasks();
  console.log(newTask.value);
  newTask.value = ' ';
  };

///// Edit task ////
async function changeState() {
  nowEditing.value = true;
  
};

async function saveEdit(item){
  await storeTasks.editTask(item.title, item.id)
  nowEditing.value = false;
  await fetchAllTasks();
}

async function removeTask(task) {
  // const taskId = user.task.title
  await storeTasks.deleteTask(task.id);
  await fetchAllTasks();
}

async function showComplete(item) {

  item.is_complete = !item.is_complete;
  console.log(item.is_complete)
  await storeTasks.isComplete(item.is_complete, item.id)
  await fetchAllTasks();
}
//Log out function
async function logout(){
  await user.signOut();
  router.push ('/auth');
};
</script>


<template>

<div class="md:flex min-h-screen p-20 bg-stone-300 h-full text-2xl text-gray-700 font-thin">
      <!-- Add new task  -->
  <div class="" v-for="task in allTasks" :key="task.id"></div>
    <input 
    v-model="newTask"
    v-on:keyup.enter ="addTask"
    class="md:flex min-w-full p-4 rounded" 
    type="text"
    placeholder=" write here... "/>
    
    <div class="mb-5">
    
    <button @click ="addTask" class=" bg-gray-500 text-stone-300 p-4 rounded hover:text-yellow-200">➕ Add task</button>  
    </div>  

     <!-- show each task input--->
    <div v-for="task in allTasks"  :key="task.id">
     <span class ="p-2 underline-offset-8 underline decoration-yellow-600 ">{{ task.title }}</span>


    <!---change state to true in order to open input and show task just entered (due to v-model), so that edit is possible--->

<div>
    <button @click="changeState()" class="p-5 hover:bg-stone-200">🖍️</button>
    <input v-if ="nowEditing" 
     v-model = "task.title"
    />
    <!-- update the edited task on Supabase and hide input-->
    <button @click ="saveEdit(task)">save</button> 

    <!-- task completed -->
<div >
    <button class="p-5" @click ="showComplete(task)">done✅</button>
</div>
    <!--  delete task-->
      <button @click ="removeTask(task)" class="p-5 text-xl hover:bg-stone-200">🗑️
      </button>
  </div>    
</div>

<!-- Logout -->
<div class="mt-20">
  <button @click ="logout" class="rounded hover:bg-gray-200 font-medium py-4">Log Out
</button>
  </div>
</div>

</template>
