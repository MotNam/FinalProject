<template>
  
  <!-- error handling -->
  
  <div v-if="errorMsg">
    <p>{{ errorMsg }}</p>
  </div>
   
  <!-- Registration -->
<form @submit.prevent="registration">
  <h2>Register</h2>
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

      <label>Confirm Password</label>
    <div>
    <input type="password" 
          v-model="confirmPassword" 
          id = "confirmPassword" 
          required="required"
          placeholder ="confirm password"
          class ="">   
    </div>
    <button type="submit" class="bg-black text-white">Submit</button>
   </form>
  
   
<div>
    <p>Have an account? 
       <RouteOne class="" 
        :route="route"
        :buttonText="buttonText"
       />
      </p>
</div>
   

</template>

<script setup>
// src/views/Register.vue
// import { reactive } from 'vue'

import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";
import { supabase } from "../supabase";
import RouteOne from "./RouteOne.vue";
import Login from "./Login.vue";


  const email = ref(null);
  const password = ref(null);
  const confirmPassword = ref(null);
  const errorMsg = ref(null);
  const router = useRouter();
  const user = useUserStore();

 const route = "/auth";
 const buttonText = "Log In";

//Registration function//

  async function registration() { 
    if (password.value === confirmPassword.value) {
      try {
        const {error} = await supabase.auth.signUp ({
          email: email.value,
          password: password.value,
        });
        if (error) throw error;
        router.push('/');
      } 
      catch (error) {
        errorMsg.value = error.message;
        setTimeOut (() => {
        errorMsg.value = null;
    }, 5000)
      }
    } else {
     errorMsg.value = "Error: passwords don't match";
     setTimeOut (() => {
       errorMsg.value = null;
    }, 5000)
    }  
  };

</script>

<style>

</style> 