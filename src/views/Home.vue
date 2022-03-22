<template>
  <h1 class="text-3xl font-bold">
    Home Page
  </h1>
<!-- <div>
  <Login />
</div> -->
<div>
  <button @click="SignOut">Sign Out</button>
  </div>

</template>

<script setup>
import { ref } from "vue";
import Login from "../components/Login.vue"

</script>

<style>

</style>