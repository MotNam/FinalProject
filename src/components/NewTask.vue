<script setup>
import { ref } from "vue";
import { supabase } from "../Supabase";
import { useTaskStore } from "../store/task";
import { useUserStore } from "../store/user";
import { useRouter } from "vue-router";

//To register a new task on Supabase & display
const newTask = ref("");
const allTasks = ref([]);
const errorMsg = ref("");
const nowEditing = ref(false);

const storeTasks = useTaskStore();
const user = useUserStore();
const router = useRouter();

async function fetchAllTasks() {
  allTasks.value = await storeTasks.fetchTasks();
  console.log(allTasks.value);
}

fetchAllTasks();

async function addTask() {
  await storeTasks.createTask(newTask.value);
  await fetchAllTasks();
  console.log(newTask.value);
  newTask.value = " ";
}

///// Edit task ////
async function changeState(task, index) {
  nowEditing.value = !nowEditing.value;
}

async function saveEdit(item) {
  await storeTasks.editTask(item.title, item.id);
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
  console.log(item.is_complete);
  await storeTasks.isComplete(item.is_complete, item.id);
  await fetchAllTasks();
}
//Log out function
async function logout() {
  await user.signOut();
  router.push("/auth");
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

    <!-- show each task input--->

    <div v-for="(task, index) in allTasks" :key="task.id">
      <span class="p-2 underline-offset-8 underline decoration-yellow-600">{{
        task.title
      }}</span>

      <!---change state to true in order to open input and show task entered (v-model), so edit is possible--->

      <div>
        <button
          @click="changeState(task, index)"
          class="p-5 hover:bg-stone-200"
        >
          🖍️
        </button>
        <!-- <input
          v-if="nowEditing"
          v-model="task.title"
          type="text"
          class="min-w-full p-4"
        /> -->
        <!-- update edited task on Supabase and hide input-->
        <!-- <button class="p-4 hover:bg-cyan-200 text-lg" @click="saveEdit(task)">
          save edit
        </button> -->

        <div v-if="nowEditing" class="flex flex-row">
          <input v-model="task.title" type="text" class="w-4/6 p-4" />
          <button
            class="p-4 bg-blue-200 hover:bg-cyan-200 text-lg w-2/6"
            @click="saveEdit(task)"
          >
            Update Task
          </button>
        </div>

        <!-- task completed -->
        <!-- <div>
          <button class="p-4 hover:bg-stone-200" @click="showComplete(task)">
            ✅
          </button>
        </div> -->
        <!--  delete task-->
        <!-- <button
          @click="removeTask(task)"
          class="p-4 text-xl hover:bg-stone-200"
        >
          🗑️
        </button> -->
      </div>
    </div>

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
