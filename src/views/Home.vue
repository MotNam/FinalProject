<template>
<div class="min-h-screen p-20 bg-stone-300 h-full">

  <h1 class="text-3xl font-bold p-20">
    My Task Organizer  
  </h1>
  <Nav />

  <!-- <Login /> -->
</div>


</template>

<script setup>
import { ref } from "vue";
// import Login from "../components/Login.vue"
import Nav from '../components/Nav.vue'
import { supabase } from "../supabase";
import { useRouter } from "vue-router";


</script>

<style>

</style>