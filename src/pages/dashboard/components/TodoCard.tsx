import {
  Button,
  ConfirmationAlert,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { useTodoBoardStore } from "../store";
import type { ITodo } from "../types";

interface TodoCardProps {
  todo: ITodo;
}

export const TodoCard = ({ todo }: TodoCardProps) => {
  const { removeTodo, setOverColumn, setEditTodoItem, setIsNewTodoModalOpen } =
    useTodoBoardStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("item", JSON.stringify(todo));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDelete = () => {
    removeTodo(todo.id);
    setIsDeleteModalOpen(false);
  };

  const handleDragEnd = () => {
    setOverColumn(null);
  };

  const handleEdit = () => {
    setEditTodoItem(todo);
    setIsNewTodoModalOpen(true);
  };

  return (
    <Fragment>
      <ConfirmationAlert
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Todo"
        description="Are you sure you want to delete this todo?"
        actionFunction={handleDelete}
        text="Delete"
      />
      <div
        className="bg-white rounded-sm p-3 shadow-sm overflow-hidden space-y-2 cursor-grab"
        draggable={true}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium line-clamp-2">{todo.title}</h3>
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
                type="button"
                variant="secondary"
                size="sm"
                className="cursor-pointer p-0 w-6 h-6 rounded-sm bg-transparent border-none hover:bg-transparent"
                onClick={handleEdit}
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
                type="button"
                variant="secondary"
                size="sm"
                className="cursor-pointer p-0 w-6 h-6 rounded-sm bg-transparent border-none hover:bg-transparent"
                onClick={() => setIsDeleteModalOpen(true)}
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
    </Fragment>
  );
};
