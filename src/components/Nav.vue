<template>
  <nav>
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <router-link to="login">Log In</router-link> | -->
      <!-- <router-link to="register">Register</router-link> | -->
      <router-link to="new-task">New Task</router-link> |
        <button @click="logout">Log Out </button>
    </nav>
  <router-view/>

</template>

<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router";
import { supabase } from "../Supabase"

const router = useRouter()

async function logout(){
  const { error } = await supabase.auth.signOut()
  router.push ('/auth');
}
</script>

<style>

</style>