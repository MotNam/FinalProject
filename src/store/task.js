import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "../store/user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    //Retrieve tasks for logged-in user

    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks") // Select the Table
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
    },
    // Add new task to Supabase

    async createTask(title) {
      const myUser = useUserStore();
      console.log(myUser.user.id);
      console.log(title);
      const { data, error } = await supabase.from("tasks").insert([
        {
          title: title,
          is_complete: false,
          user_id: myUser.user.id,
        },
      ]);
      if (error) throw error;
    },

    // async updateList(tasks) {
    //   const { data, error} = await supabase
    //   .from ("tasks")
    //   .update ({})
    // }

    async deleteTask(task) {
      try {
        const { data, error } = await supabase
          .from("tasks")
          .delete()
          .match("id", task);
        console.log("task deleted", task);
      } catch (error) {
        console.log("error", error);
      }
    },
  },
});
