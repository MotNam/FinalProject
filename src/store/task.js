import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "../store/user";
import { ref } from "vue";

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

    // Run the fecthTasks function when the component is mounted
    // useEffect(() => {
    //   fecthTasks();
    // }, []);

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

    // async updateList(tasks) {
    //   const { data, error} = await supabase
    //   .from ("tasks")
    //   .update ({})
    // }

    async deleteTask(id) {
      try {
        const myUser = useUserStore();
        const { data, error } = await supabase
          .from("tasks")
          .delete()
          .eq("id", user.id);
        console.log("task deleted", user.id);
      } catch (error) {
        console.log("error", error);
      }
    },
  },
});
