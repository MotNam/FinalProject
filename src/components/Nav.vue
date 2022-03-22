<template>
  <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="login">Log In</router-link> |
      <router-link to="register">Register</router-link> |
      <router-link to="new-task">New Task</router-link> |

    </nav>
  <router-view/>
</template>

<script setup>
import { ref, reactive, computed } from "vue"

</script>

<style>

</style>