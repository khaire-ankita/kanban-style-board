import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Task, TaskStatus } from "../types";
import { Column } from "./Column";
import { AddTaskModal } from "./AddTaskModal";
import { api } from "../services/api";
import { DragDropErrorBoundary } from "./DragDropErrorBoundary";

const COLUMNS: { id: TaskStatus; title: string }[] = [
  { id: "To Do", title: "To Do" },
  { id: "In Progress", title: "In Progress" },
  { id: "Done", title: "Done" },
];

export const Board: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const fetchedTasks = await api.getTasks();

      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  };

  const handleAddTask = async (newTask: Omit<Task, "id">) => {
    try {
      const createdTask = await api.createTask(newTask);
      setTasks((prev) => [...prev, createdTask]);
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const handleDrop = async (taskId: number, newStatus: TaskStatus) => {
    try {
      await api.updateTask(taskId, {
        status: newStatus,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status: newStatus,
              }
            : task
        )
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Task Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Task
        </button>
      </div>

      <DragDropErrorBoundary>
        <DndProvider backend={HTML5Backend}>
          <div className="flex gap-4">
            {COLUMNS.map((column) => {
              const columnTasks = tasks.filter(
                (task) => task.status === column.id
              );
              return (
                <Column
                  key={column.id}
                  id={column.id}
                  title={column.title}
                  tasks={columnTasks}
                  onDrop={handleDrop}
                />
              );
            })}
          </div>
        </DndProvider>
      </DragDropErrorBoundary>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTask}
      />
    </div>
  );
};
