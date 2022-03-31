<!-- show each task input--->
  <div v-for="(task, index) in allTasks" :key="task.id">
    <span class="p-2 underline-offset-8 underline decoration-yellow-600">{{
      task.title
    }}</span>

    <!---change state to true in order to open input and show task entered (v-model), so edit is possible--->

    <div>
      <button @click="changeState(task, index)" class="p-5 hover:bg-stone-200">
        🖍️
      </button>
      <!-- <input
          v-if="nowEditing"
          v-model="task.title"
          type="text"
          class="min-w-full p-4"
        /> -->
      <!-- update edited task on Supabase and hide input-->
      <!-- <button class="p-4 hover:bg-cyan-200 text-lg" @click="saveEdit(task)">
          save edit
        </button> -->

      <div v-if="nowEditing" class="flex flex-row">
        <input v-model="task.title" type="text" class="w-4/6 p-4" />
        <button
          class="p-4 bg-blue-200 hover:bg-cyan-200 text-lg w-2/6"
          @click="saveEdit(task)"
        >
          Update Task
        </button>
      </div>

      <!-- task completed -->
      <div>
        <button class="p-4 hover:bg-stone-200" @click="showComplete(task)">
          ✅
        </button>
      </div>
      <!--  delete task-->
      <button @click="removeTask(task)" class="p-4 text-xl hover:bg-stone-200">
        🗑️
      </button>
    </div>
  </div>