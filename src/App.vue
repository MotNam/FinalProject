<template>
 
<!-- <Nav /> -->
  <!-- <div class="container" style="padding: 50px 0 100px 0">
  </div> -->

   <!-- Check if user is available in the store, if not show auth compoenent -->

  <section>

<router-view class="app-main" />    
  </section>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "./Supabase";
import { createClient } from "@supabase/supabase-js";
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from './store/user'
import Auth from './views/Auth.vue'
// import Nav from './components/Nav.vue'



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
