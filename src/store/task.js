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
      return (this.tasks = tasks);
    },
    // Add new task to Supabase

    async createTask(title) {
      const myUser = useUserStore();
      // console.log(myUser.user.id);
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

    // Delete task
    async deleteTask(id) {
      try {
        const { data, error } = await supabase
          .from("tasks")
          .delete()
          .match({ id: id });
        // console.log("task deleted", item);
        alert("are you sure?");
      } catch (error) {
        console.log("error", error);
      }
    },
    //Edit task
    async editTask(title, id) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ title: title })
        .match({ id: id });
    },

    //Is Complete
    async isComplete(status, item) {
      const { error } = await supabase
        .from("tasks")
        .update({ is_complete: status })
        .match({ id: item });
      if (error) throw error;
    },
  },
  // async getTimeStamp(time, item) {
  //   const { data: tasks, error } = await supabase
  //     .from("tasks")
  //     .select({ inserted_at: time })
  //     .match({ id: item });
  //   console.log("inserted_at");
  // },
});
