<template>
  <form @submit.prevent="addTask()" class="form w-100">
    <input
      class="control w-100"
      type="text"
      name=""
      id="inputDescription"
      placeholder="Type a task"
      v-model="task.description"
      required
    />
    <button
      id="btnCreateTask"
      :class="{
        btn: 'btn',
        disabled: task.description ? false : true,
      }"
    >
      Create task
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { createTask, getLastTaskId } from "../api/TaskApi";
import Task from "../interfaces/Task";

export default defineComponent({
  data() {
    return {
      task: {} as Task,
    };
  },

  methods: {
    async addTask() {
      const response = await createTask(this.task.description);

      if (response.data.error == false) {
        const lastTask = await getLastTaskId();
        const [data] = lastTask.data;

        this.$emit("dataToParent", {
          id: data.id,
          description: this.task.description,
          done: false,
        });

        this.task.description = "";
      }
    },
  },
});
</script>
