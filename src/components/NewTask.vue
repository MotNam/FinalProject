<script setup>
import { ref } from "vue";
import { supabase } from "../Supabase";
import { useTaskStore } from "../store/task";
import { useUserStore } from "../store/user";
import { useRouter } from "vue-router";
import TaskItem from "../components/TaskItem.vue";

//To register a new task on Supabase & display
const newTask = ref("");
const allTasks = ref([]);

//user and task functions to connect to Supabase, stored in Pinia
const storeTasks = useTaskStore();
const user = useUserStore();
const router = useRouter();

// function to fetch all tasks fromm supabase using pinia
async function fetchAllTasks() {
  allTasks.value = await storeTasks.fetchTasks();
  console.log(allTasks.value);
}

fetchAllTasks();

// function to add task to supabase using pinia
async function addTask() {
  await storeTasks.createTask(newTask.value);
  fetchAllTasks();
  console.log(newTask.value);
  newTask.value = " ";
}

//Log out function
async function logout() {
  await user.signOut();
  router.push("/auth");
}

//Toggle Tasks between done & undone [true or false]
async function toggleTask(item) {
  const toggleComplete = !item.is_complete;
  const toggleId = item.id;
  await useTaskStore().isComplete(toggleComplete, toggleId);
  fetchAllTasks();
}

// Function to edit current Task
async function saveEdit(item) {
  const newTaskTitle = item.newValue;
  const editId = item.oldValue.id;
  await storeTasks.editTask(newTaskTitle, editId);
  fetchAllTasks();
}

// Function to remove currentTask
async function remove(item) {
  await useTaskStore().deleteTask(item.id);
  fetchAllTasks();
}

//function to get time??
// async function taskTime(item) {
//   const createdTime = item.inserted_at;
//   await storeTasks.getTimeStamp(createdTime, item.id);
//   console.log(createdTime);
//   fetchAllTasks();
// }
</script>

<template>
  <div
    class="xl:p-10 min-h-screen p-20 bg-stone-300 h-full text-2xl text-gray-700 font-thin"
  >
    <div class="flex justify-between">
      <h1 class="text-4xl py-10">📔 Start Today</h1>
      <div class="p-10">
        <button
          @click="logout"
          class="rounded hover:bg-gray-200 hover:text-cyan-600 font-medium p-2 ml-3"
        >
          Log Out<span class="inline-block align-bottom px-3 text-cyan-500"
            ><img
              src="../assets/android-logout-icon-12.jpg"
              alt="logout"
              class="w-10"
          /></span>
        </button>
      </div>
    </div>
    <!-- Add new task Input  -->
    <div class="md:inline-flex sm:flex sm:justify-items-start">
      <input
        v-model="newTask"
        v-on:keyup.enter="addTask"
        class="min-w-full p-4 rounded mb-2 text-center sm:text-left"
        type="text"
        placeholder=" To do... "
      />

      <div class="m-2">
        <button
          @click="addTask"
          class="bg-yellow-500 text-stone-600 p-4 rounded mb-2 hover:text-yellow-200 sm:flex"
        >
          ➕Add task
        </button>
      </div>
    </div>
    <!-- Task Item -->
    <TaskItem
      v-for="(task, index) in allTasks"
      :key="task.id"
      :item="task"
      @childToggle="toggleTask"
      @childRemove="remove"
      @childEdit="saveEdit"
    />
    <!-- Logout -->
    <div class="mt-10">
      <button
        @click="logout"
        class="rounded hover:bg-gray-200 hover:text-cyan-600 font-medium p-3"
      >
        <span class="inline-block align-bottom px-3 text-cyan-500"
          ><img
            src="../assets/android-logout-icon-12.jpg"
            alt="logout"
            class="w-10" /></span
        >Log Out
      </button>
    </div>
  </div>
</template>
