<template>
  <div class="container">
    <header class="header">
      <h1>DoitYourself</h1>
      <small>Tarea N° {{ index }}</small>
    </header>
    <form @submit.prevent="handleUpdateTask()" class="form w-100">
      <input
        class="control w-100"
        type="text"
        name=""
        id="inputDescription"
        placeholder="New description of task"
        v-model="task.description"
        required
      />
      <button
        id="btnUpdateTask"
        :class="{
          btn: 'btn',
          disabled: task.description ? false : true,
        }"
      >
        Update task
      </button>
    </form>
    <div v-if="activeMessage" class="message">{{ message }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getTask, updateTask } from "../api/TaskApi";
import Task from "../interfaces/Task";

function wait(milliSeconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliSeconds));
}

export default defineComponent({
  props: ["index"],

  data() {
    return {
      task: {} as Task,
      message: "Updated task!!!!",
      activeMessage: false,
    };
  },

  methods: {
    async loadTask(id: string) {
      const response = await getTask(id);
      this.task.id = response.data.id;
      this.task.description = response.data.description;
    },

    async handleUpdateTask() {
      const _id = this.$route.params.id;
      if (typeof _id == "string") {
        const response = await updateTask(_id, this.task.description);
        this.task.description = "";

        if (response.data.error == false) {
          this.activeMessage = true;
          wait(500).then(() => {
            this.$router.push("/");
          });
        }
      }
    },
  },

  mounted() {
    const _id = this.$route.params.id;
    if (typeof _id == "string") {
      this.loadTask(_id);
    }
  },
});
</script>
