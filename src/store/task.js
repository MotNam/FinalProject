import { defineStore } from "pinia";
import { supabase } from "../supabase";
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

    // Add new task to Supabase??

    async createTask(task) {
      const { data, error } = await supabase.from("tasks").insert([
        {
          id: id++,
          user: this.user,
          title: newTask.value,
        },
      ]);

      if (error) {
        alert(error.message);
        console.error("error ", error);
        return null;
      } else {
        alert("task created");
      }
    },
  },
});
