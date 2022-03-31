<template>
  <div class="mb-4">
    <div class="flex justify-between">
      <h1 class="text-blue-500">{{ item.title }}</h1>
      <div v-if="item.is_complete">✅</div>
    </div>
    <div>
      <!-- <div v-if="item.is_complete">
        <h1>completed</h1>
      </div> -->
      <!-- <div v-else="!item.is_complete">
        <h1>Not completed</h1>
      </div> -->
      <!-- <div v-if="item.is_complete">✅</div> -->
      <!-- <div v-else="!item.is_complete">
        <h1>🛑</h1>
      </div> -->

      <button @click="toggleTask()" class="text-green-500">Complete</button>
      <button @click="toggleEdit()" class="hover:bg-stone-200">🖍️</button>
      <button @click="remove()" class="text-red-500">Delete</button>
    </div>
    <div v-if="editDialog">
      <input v-model="editTask" type="text" />
      <button @click.prevent="edit()">Save Edit</button>
      <p class="text-red-500 text-xs">{{ errorInput }}</p>
    </div>
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
let currentIndex = ref(""); // Used to pick only the selected task to be edited
let taskDone = true; // toggles boolean

// Definition of childFunctions that will be used on parent component
const emit = defineEmits([
  "childToggle",
  "childRemove",
  "childEdit",
  "childToggleEdit",
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
    editTask.value = ""; // clears input field
  }
}
// //Error Handling Funciton
// function errorHandle() {
//   errorInput.value = "Task field edit cannot be empty";
//   empty.value = true;
// }

// Function to remove items
function remove() {
  emit("childRemove", props.item);
}

// Error Handling
</script>

<style></style>
