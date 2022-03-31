<template>
  <div class="py-10 ml-3 text-3xl text-cyan-100 font-medium">
    <h1>My Task Organizer</h1>
  </div>

  <!-- error handling -->

  <div v-if="errorMsg">
    <p>{{ errorMsg }}</p>
  </div>

  <!-- Sign In -->
  <form @submit.prevent="login" class="p-4">
    <label class="text-cyan-300">Email</label>
    <div class="mb-5">
      <input
        type="text"
        v-model="email"
        id="email"
        required="required"
        placeholder="Email"
        class="p-3 md:flex min-w-fit rounded"
      />
    </div>
    <label class="text-cyan-300">Password</label>
    <div>
      <input
        type="password"
        v-model="password"
        id="password"
        required="required"
        placeholder="Password"
        class="p-3 md:flex min-w-fit rounded"
      />
    </div>

    <button type="submit" class="mt-2 hover:text-cyan-200 bold">Log In</button>
  </form>

  <div class="p-2 md:flex">
    <p class="py-4">Not registered?</p>
    <RouteOne
      class="bg-cyan-200 text-cyan-900 p-2 mt-2 rounded hover:bg-gray-200 text-semibold"
      :route="route"
      :buttonText="buttonText"
    />
  </div>
</template>

<script setup>
// src/views/Register.vue
// import { reactive } from 'vue'

import { ref } from "vue";
// import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import RouteOne from "./RouteOne.vue";
import { useUserStore } from "../store/user";
import { useTaskStore } from "../store/task";

const user = useUserStore();
let route = "/auth/register";
let buttonText = "Sign Up";
const router = useRouter();

const email = ref(null);
const password = ref(null);
const errorMsg = ref(null);

//login function//

async function login() {
  try {
    await user.signIn(email.value, password.value);
    console.log(email, password);
    // if (error) throw error;
    router.push("/");
    console.log(email, password);
  } catch (error) {
    errorMsg.value = `Error: ${error.message}`;
    setTimeOut(() => {
      errorMsg.value = null;
    }, 5000);
  }
}
</script>

<style></style>
