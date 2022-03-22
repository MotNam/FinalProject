<template>
   
  <h1>Log In Page</h1>
  <!-- error handling -->
 
    <div v-if="errorMsg">
    <p>{{ errorMsg }}</p>
  </div>

  <!-- Sign In -->
<form @submit.prevent="login">
  <h2>Log In</h2>
    <label>Email</label>
    <div>
    <input type="text" 
          v-model="email" 
          id = "email" 
          required="required"
          placeholder ="Email"
          class ="">   
    </div>
     <label>Password</label>
    <div>
    <input type="password" 
          v-model="password" 
          id = "password" 
          required ="required"
          placeholder ="Password"
          class ="">   
    </div>

     <button type="submit">Log In</button>

    </form>
   
   <p>Not registered? 
       <RouteOne class="" 
        :route="route"
        :buttonText="buttonText"
       />
       <span>Click to Register</span></p>
    
</template>

<script setup>
// src/views/Register.vue
// import { reactive } from 'vue'

import { ref } from "vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import RouteOne from "./RouteOne.vue";
import { useUserStore } from "../store/user";
  
  const user = useUserStore();
  let route = "/auth/register";
  let buttonText = "Register"
  const router =useRouter()
  const email = ref(null);
  const password = ref(null);
  const errorMsg = ref(null);

  //login function//
async function login(){
  try {
    const {error} = await supabase.auth.signIn({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    router.push ('/');
  }
  catch (error){
    errorMsg.value = `Error: ${error.message}`;
   setTimeOut (() => {
        errorMsg.value = null;
    }, 3000)
  }

}

</script>


<style>

</style> 