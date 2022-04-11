<template>
  <div class="my-10">
    <!-- show added task -->
    <div v-if="editDialog">
      <input
        class="flex sm:w-1/2 p-4 rounded justify-items-start align-middle my-5"
        v-model="editTask"
        type="text"
      />
    </div>

    <div v-else class="flex-nowrap">
      <h1
        class="p-2 underline-offset-8 underline decoration-yellow-600 text-gray-700 text-3xl font-light"
      >
        {{ item.title }}
      </h1>
      <!-- Added At -->
      <span class="p-2 text-right text-base font-mono w-full sm:w-1/2">
        created: {{ item.inserted_at.split("T")[0] }}
      </span>
      <span v-if="item.is_complete" class="text-3xl p-2">✅</span>
    </div>
  </div>
  <!-- show Edit dialog -->
  <div class="flex flex-col items-start md:flex-row">
    <button
      v-if="!editDialog"
      @click="toggleEdit()"
      class="p-2 mx-5 hover:bg-stone-200 text-stone-600"
    >
      edit 🖍️
    </button>
    <div v-if="editDialog" class="justify-between">
      <!-- <input v-model="editTask" type="text" class="min-w-full p-4" /> -->
      <button
        @click.prevent="edit()"
        class="hover:bg-stone-200 rounded p-3 text-yellow-700 font-light text-xl"
      >
        save_edit
      </button>

      <p v-if="empty" class="text-red-500 text-sm">{{ errorInput }}</p>
    </div>
    <!-- Show done/undone -->
    <button
      @click="toggleTask()"
      class="hover:bg-stone-200 rounded p-2 mx-5 text-cyan-800 font-light align-text-top"
    >
      done?
    </button>
    <!-- delete function -->
    <button
      @click="remove()"
      class="text-2xl hover:bg-stone-200 rounded p-2 mx-5 text-gray-600"
    >
      delete 🗑️
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Error messages variables
let empty = ref(false); // for editing a task
let errorInput = ref(""); // error message variable

// Edit Task Variables
let editTask = ref(""); // value from edit dialog
let editDialog = ref(false); // initially hidden where the input field will go
let currentIndex = ref(""); // Used to pick only the selected task to be edited???
let taskDone = true; // toggles boolean

// Definition of childFunctions that will be used on parent component
const emit = defineEmits([
  "childToggle",
  "childRemove",
  "childEdit",
  // "childToggleEdit",
]);

// Set up the content of the template as an array prop to be used on the parent
const props = defineProps(["item"]);

// Error Handling Funciton
function errorHandle() {
  errorInput.value = "Task field edit cannot be empty";
  empty.value = true;
}

// Show Edit Dialog
function toggleEdit() {
  editDialog.value = !editDialog.value;
  editTask.value = props.item.title;
}

// Toggle Done & Undone
function toggleTask() {
  emit("childToggle", props.item);
}

// Function to edit tasks with validation :)
function edit() {
  if (editTask.value === "") errorHandle();
  // this errorHandle function displays an error if editTaskvalue if empty
  else {
    empty.value = false; // hides error message just in case
    editDialog.value = false; // hides the container where editing value lives
    const editValues = {
      oldValue: props.item,
      newValue: editTask.value,
    };
    emit("childEdit", editValues);
    editDialog.value = false; // hides input container
  }
}
// //Error Handling Function
// function errorHandle() {
//   errorInput.value = "Task field edit cannot be empty";
//   empty.value = true;
// }--->NEEDS TO BE BEFORE EDIT FUNCTION

// Function to remove items
function remove() {
  emit("childRemove", props.item);
}

// Error Handling
</script>

<style></style>
