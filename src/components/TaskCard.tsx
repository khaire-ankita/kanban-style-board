import React from "react";
import { useDrag } from "react-dnd";
import { Task } from "../types";

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="bg-white p-4 rounded-lg shadow mb-2 cursor-move hover:shadow-md transition-shadow"
    >
      <h3 className="font-semibold text-gray-800">{task.title}</h3>
      {task.description && (
        <p className="text-gray-600 mt-2 text-sm">{task.description}</p>
      )}
    </div>
  );
};
