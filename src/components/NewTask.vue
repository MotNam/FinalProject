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

///// Edit task ////
// async function changeState(task, index) {
//   nowEditing.value = !nowEditing.value;
// }

// async function removeTask(task) {
//   // const taskId = user.task.title
//   await storeTasks.deleteTask(task.id);
//   await fetchAllTasks();
// }

// async function showComplete(item) {
//   item.is_complete = !item.is_complete;
//   console.log(item.is_complete);
//   await storeTasks.isComplete(item.is_complete, item.id);
//   await fetchAllTasks();
// }

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

// Function to edit currenTask
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
</script>

<template>
  <div
    class="lg:flex min-h-screen p-20 bg-stone-300 h-full text-2xl text-gray-700 font-thin"
  >
    <div class="flex justify-between">
      <h1 class="text-4xl py-10">📔 Start here</h1>
      <div class="p-10">
        <button
          @click="logout"
          class="rounded hover:bg-gray-200 hover:text-cyan-600 font-medium py-4"
        >
          Log Out
        </button>
      </div>
    </div>
    <!-- Add new task Input  -->
    <div>
      <input
        v-model="newTask"
        v-on:keyup.enter="addTask"
        class="min-w-full p-5 rounded mb-2"
        type="text"
        placeholder=" to do... "
      />

      <div class="mb-5">
        <button
          @click="addTask"
          class="bg-gray-500 text-stone-300 p-4 rounded hover:text-yellow-200"
        >
          ➕ Add task
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
        class="rounded hover:bg-gray-200 hover:text-cyan-600 font-medium py-4"
      >
        Log Out
      </button>
    </div>
  </div>
</template>
