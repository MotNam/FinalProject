<template>
  <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="sign-in">Sign In</router-link> |
       <router-link to="sign-up">Sign Up</router-link> |
        <router-link to="new-task">New Task</router-link> |

    </nav>
  <router-view/>
</template>

<script setup>
import { ref } from "vue"
</script>

<style>

</style>