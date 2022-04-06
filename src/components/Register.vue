<template>
  <!-- error handling -->
  <div class="lg:flex">
    <div v-if="errorMsg">
      <p>{{ errorMsg }}</p>
    </div>

    <!-- Registration -->

    <form @submit.prevent="registration" class="py-10 ml-3 text-cyan-200">
      <h2 class="text-3xl font-medium mb-20">Sign Up</h2>

      <div class="mb-10">
        <label class="text-md font-medium mb-10">Email</label>
        <div>
          <input
            type="text"
            v-model="email"
            id="email"
            required="required"
            placeholder="example@email.com"
            class="p-3 mb-5 min-w-fit rounded"
          />
        </div>
        <label>Password</label>
        <div>
          <input
            type="password"
            v-model="password"
            id="password"
            required="required"
            placeholder="Password"
            class="p-3 mb-3 min-w-fit rounded"
          />
        </div>

        <label>Confirm Password</label>
        <div>
          <input
            type="password"
            v-model="confirmPassword"
            id="confirmPassword"
            required="required"
            placeholder="confirm password"
            class="p-3 mb-5 rounded"
          />
        </div>
        <button
          type="submit"
          class="bg-gray-600 text-gray-200 p-2 rounded hover:bg-gray-500 hover:font-bold"
        >
          Submit
        </button>
      </div>
    </form>
  </div>

  <div class="p-2 lg:flex">
    <p class="py-2 text-gray-800">
      Have an account?
      <RouteOne
        class="bg-cyan-200 text-gray-700 p-2 mt-2 rounded hover:bg-gray-200 hover:font-bold"
        :route="route"
        :buttonText="buttonText"
      />
    </p>
  </div>
</template>

<script setup>
// import { reactive } from 'vue'

import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";
import { supabase } from "../supabase";
import RouteOne from "./RouteOne.vue";
// import Login from "./Login.vue";

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
      await user.signUp(email.value, password.value);
      alert("please check your email to confirm sign up");

      const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      });
      if (error) throw error;
      router.push("/");
    } catch (error) {
      errorMsg.value = error.message;
      setTimeOut(() => {
        errorMsg.value = null;
      }, 5000);
    }
  } else {
    errorMsg.value = "Error: passwords don't match";
    setTimeOut(() => {
      errorMsg.value = null;
    }, 5000);
  }
}
</script>

<style></style>
