import React from "react";
import { useDrop } from "react-dnd";
import { Task, TaskStatus } from "../types";
import { TaskCard } from "./TaskCard";

interface ColumnProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  onDrop: (taskId: number, newStatus: TaskStatus) => Promise<void>;
}

export const Column: React.FC<ColumnProps> = ({ id, title, tasks, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => {
      onDrop(item.id, id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className="flex-1 min-w-[300px] bg-gray-100 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">{title}</h2>
      <div
        ref={drop}
        className={`min-h-[500px] p-2 rounded-lg transition-colors ${
          isOver ? "bg-gray-200" : "bg-gray-50"
        }`}
      >
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
};
