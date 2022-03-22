import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Home from "../views/Home.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import NewTask from "../components/NewTask.vue";

const routes = [
  {
    path: "/auth",
    component: Auth,
    children: [
      { path: "", component: Login },
      { path: "Register", component: Register },
    ],
  },
  { path: "/", component: Home },
  { path: "/login", component: Login },
  // { path: "/register", component: Register },
  { path: "/new-task", component: NewTask },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
