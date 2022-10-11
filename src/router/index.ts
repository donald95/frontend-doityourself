import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import TaskList from "../components/TaskList.vue";
import TaskEditForm from "../components/TaskEditForm.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    alias: "/tasks",
    name: "tasks",
    component: TaskList,
  },
  {
    path: "/tasks/:index/:id",
    alias: "/tasks/:index/:id",
    name: "tasks-edit",
    component: TaskEditForm,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
