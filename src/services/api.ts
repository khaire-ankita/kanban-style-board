import axios from "axios";
import { Task } from "../types";

const API_URL = "http://localhost:3001/tasks";

export const api = {
  async getTasks(): Promise<Task[]> {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  },

  async createTask(task: Omit<Task, "id">): Promise<Task> {
    const response = await axios.post(`${API_URL}`, task);
    return response.data;
  },

  async updateTask(id: number, task: Partial<Task>): Promise<Task> {
    const response = await axios.patch(`${API_URL}/${id}`, task);
    return response.data;
  },

  async deleteTask(id: number): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  },
};
