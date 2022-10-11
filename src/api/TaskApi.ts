import { axiosConfig as axios } from "./axios.config";

export async function getTasks() {
  return await axios.get("/tasks");
}

export async function getTask(id: string) {  
  return await axios.get("/tasks/".concat(id));
}

export async function getLastTaskId() {  
  return await axios.get("/tasks/last-taskid");
}

export async function createTask(description: string) {
  return await axios.post("/tasks", { description: description });
}

export async function updateTask(id: string, description: string) {  
  return await axios.put("/tasks/".concat(id), {
    description: description,
  });
}

export async function completeTask(id: string) {  
  return await axios.put("/tasks/complete/".concat(id));
}

export async function uncompleteTask(id: string) {  
  return await axios.put("/tasks/uncomplete/".concat(id));
}

export async function deleteTask(id: string) {
  return await axios.delete("/tasks/".concat(id));
}
