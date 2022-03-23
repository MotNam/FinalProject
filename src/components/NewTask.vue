<script setup>
import { ref, reactive, computed } from 'vue';
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useTaskStore } from "../store/task";
// import { useUserStore } from "../store/user";
import { storeToRefs } from "pinia";

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

//Setup ref to router(for Logout)
const router = useRouter()

//Log out 
async function logout(){
  const { error } = await supabase.auth.signOut()
  router.push ('/auth');
};
//To Create a new task on Supabase
const store = useTaskStore
const { user } = storeToRefs(userStore)

</script>

<template>
  <div>
      <!-- Add new task  -->
     <form @submit.prevent="addTask">
    <input v-model="newTask">
    <button>Add New Task</button>    
  </form>
 
 <!-- Store new task -->
  <button @submit.prevent="createTask">Register Task</button>

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

<div>
  <button @click="logout">Log Out

  </button>
  </div>
  </div>
 
</template>