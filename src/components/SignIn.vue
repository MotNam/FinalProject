<template>
  <div>
    <h2>Sign in to your account</h2>
    <form @submit.prevent="handleSignin">
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <div>
        <button type="submit">Sign in</button>
      </div>
      <div>
          <button @click="SignUp">Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";
import SignUp from "./SignUp.vue";

</script>