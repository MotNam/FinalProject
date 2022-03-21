<template>
  <h1>Sign Up Page</h1>
  
   
<form @submit.prevent="">
    <label>Email</label>
    <input v-model= "email" name= "email">
   
  </form>
  <form @submit.prevent="">
    <label>Password</label>
    <input v-model="password" name= "password">
     <label>Confirm Password</label>
    <input v-model="password" name= "password">
  
    <button @click ="register">Register</button>
  </form>
 <div>
    <button @click="SignIn">Click to Sign In</button>
  </div>
</template>

<script>
// src/views/Register.vue
// import { reactive } from 'vue'

import { ref } from "vue";
import { supabase } from "../supabase";

</script>

<style>

</style> 