import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@/components";
import { PencilIcon, TrashIcon } from "lucide-react";
import type { ITodo } from "../types";

interface TodoCardProps {
  todo: ITodo;
}

export const TodoCard = ({ todo }: TodoCardProps) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("item", JSON.stringify(todo));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="bg-white rounded-sm p-3 shadow-sm overflow-hidden space-y-2 cursor-grab"
      draggable={true}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{todo.title}</h3>
      </div>
      <p className="text-sm text-gray-500 line-clamp-2">{todo.description}</p>
      <p className="text-sm text-gray-500">
        <strong>
          Due Date:{" "}
          {new Date(todo.dueDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </strong>
      </p>
      <div className="flex items-center border-t gap-2 border-gray-200 pt-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              className="cursor-pointer p-0 w-6 h-6 rounded-sm bg-transparent border-none hover:bg-transparent"
            >
              <PencilIcon className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              className="cursor-pointer p-0 w-6 h-6 rounded-sm bg-transparent border-none hover:bg-transparent"
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
