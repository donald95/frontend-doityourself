<template>
  <div class="container">
    <header class="header">
      <h1>DoitYourself</h1>
      <button
        id="btnToggleForm"
        class="btn"
        @click="activeTaskForm = !activeTaskForm"
      >
        {{ activeTaskForm ? "Hide" : "Show" }} task form
      </button>
    </header>

    <TaskForm v-show="activeTaskForm" @dataToParent="handleData" />

    <ul class="task-list">
      <li class="task-item" v-if="tasks.length < 1">No tasks</li>

      <li class="task-item" v-else v-for="(task, index) in tasks" :key="index">
        <input
          type="checkbox"
          :id="`status${index}`"
          :name="`status${index}`"
          :value="`${task.id}`"
          :checked="task.completed_at != null ? true : false"
          :v-model="task.completed_at != null ? true : false"
          @change="handleChangeCheckbox($event, task.id)"
        />

        <label
          :class="{
            'task-description': 'task-description',
            'completed-task': task.completed_at ? 'completed-task' : '',
          }"
          :for="`status${index}`"
        >
          {{ index + 1 }}.&nbsp;&nbsp;{{ task.description }}
        </label>

        <span class="task-actions">
          <button
            class="btn-edit"
            @click="handleEdit(index + 1, task.id)"
          ></button>
          <button class="btn-delete" @click="handleDelete(task.id)"></button>
        </span>
      </li>
    </ul>
  </div>

  <Teleport to="body">
    <div id="example-modal" class="modal modal-scroll" v-if="isModalOpen">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete task</h5>
            <button
              type="button"
              class="btn-close"
              aria-label="Cancelar"
              @click="isModalOpen = false"
            ></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete task?</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-light" @click="confirm(false)">
              Cancelar
            </button>
            <button class="btn" @click="confirm(true)">Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  completeTask,
  deleteTask,
  getTasks,
  uncompleteTask,
} from "../api/TaskApi";
import TaskForm from "../components/TaskForm.vue";
import Task from "../interfaces/Task";

export default defineComponent({
  data() {
    return {
      tasks: [{} as Task],
      activeTaskForm: false,
      checked: [],
      isModalOpen: false,
      taskIdentifierToDelete: "",
    };
  },

  methods: {
    async loadTasks() {
      const response = await getTasks();
      this.tasks = response.data;
    },

    handleDelete(id: string) {
      this.isModalOpen = true;
      this.taskIdentifierToDelete = id;
    },

    handleEdit(taskIndex: number, taskId: string) {
      this.$router.push(`/tasks/${taskIndex.toString()}/${taskId}`);
    },

    handleData(data: Task) {
      this.tasks.push(data);
    },

    async handleChangeCheckbox(evt: Event, id: string) {
      const target: any = evt.target;

      if (typeof target != null) {
        const attribute: any = target.getAttribute("name");
        const label: any = document.querySelector(`label[for="${attribute}"]`);
        label.classList.toggle("completed-task");

        if (target.checked) {
          const complete = await completeTask(id);
          console.log(complete.data);
        } else {
          const uncomplete = await uncompleteTask(id);
          console.log(uncomplete.data);
        }
      }
    },

    async confirm(isConfirm: Boolean) {
      if (isConfirm) {
        const response = await deleteTask(this.taskIdentifierToDelete);
        this.isModalOpen = false;
        console.log(response.data);

        if (response.data.error == false) {
          this.tasks = this.tasks.filter(
            (task) => task.id != this.taskIdentifierToDelete
          );
        }
      } else {
        this.isModalOpen = false;
      }
    },
  },

  mounted() {
    this.loadTasks();
  },

  components: {
    TaskForm,
  },
});
</script>
