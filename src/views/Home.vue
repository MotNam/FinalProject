<template>
<Nav />
  <h1 class="text-3xl font-bold">
    Home Page
  </h1>
<div>
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