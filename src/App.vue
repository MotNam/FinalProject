<template>
 
<Nav />

<h1 class="text-3xl font-bold">
    Welcome to the Vue Task App
  </h1>
   
  <h3 class="text-2xl font-bold">Sign In</h3>
  <div class="container" style="padding: 50px 0 100px 0">
  </div>

   <!-- Check if user is available in the store, if not show auth compoenent -->


  <section>

<router-view class="app-main" /> <!-- your routes will load inside of these tags -->      
  </section>
</template>

<script setup>
import { createClient } from "@supabase/supabase-js";
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from './store/user'
import Nav from './components/Nav.vue'



const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)


onMounted(async () => {
  try {
    await userStore.fetchUser() // here we call fetch user
    if (!user.value) {
      // redirect them to logout if the user is not there
      router.push({ path: '/auth' });
    } else {
      // continue to dashboard
      router.push({ path: '/' });
    }
  } catch (e) {
    console.log(e)
  }
})
</script>
