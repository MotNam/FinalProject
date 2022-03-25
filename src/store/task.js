import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "../store/user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    //Retrieve tasks for logged in user

    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
    },

    // Add new task to Supabase

    async createTask(newTask) {
      const myUser = useUserStore();
      console.log(newTask);
      console.log(myUser.user.id);
      const { data } = await supabase.from("tasks").insert([
        {
          user_id: myUser.user.id,
          title: newTask,
          is_complete: false,
        },
      ]);
    },
  },
});
