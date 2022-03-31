<template>
  <div class="md:flex text-2xl font-bold p-20">
    <nav>
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <router-link to="login">Log In</router-link> | -->
      <!-- <router-link to="register">Register</router-link> | -->
      <div class="hover:text-stone-500 hover:text-semibold mb-10">
        <router-link to="new-task">New Task</router-link> |
      </div>
      <button @click="logout" class="hover:text-cyan-600 hover:font-semibold">
        Log Out
      </button>
    </nav>

    <router-view />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../Supabase";

const router = useRouter();

async function logout() {
  const { error } = await supabase.auth.signOut();
  router.push("/auth");
}
</script>

<style></style>
