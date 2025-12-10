import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@/components";
import { PlusIcon, TrashIcon } from "lucide-react";
import { useTodoBoardStore } from "../store";
import type { ITodo, ITodoColumn } from "../types";
import { TodoCard } from "./TodoCard";

interface TodoColumnProps {
  column: ITodoColumn;
  todos: ITodo[];
}

export const TodoColumn = ({ column, todos }: TodoColumnProps) => {
  const { moveTodo } = useTodoBoardStore();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const item = JSON.parse(e.dataTransfer.getData("item")) as ITodo;
    moveTodo(item.id, column.id);
  };

  return (
    <div className="flex h-full flex-col bg-gray-50/50 border border-gray-200 rounded-sm">
      <div className="flex flex-col pb-3 h-full rounded-md bg-gray-50/30 w-[300px] border border-transparent">
        <div className="flex flex-col space-y-3 flex-1">
          <div className="flex items-center justify-between px-3 bg-primary py-1 rounded-sm text-white">
            <h3 className="text-md font-medium">
              {column.label} - {todos.length}
            </h3>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="cursor-pointer p-0 w-6 h-6 rounded-sm bg-transparent border-none hover:bg-transparent"
                  >
                    <PlusIcon className="w-4 h-4 text-white" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add Todo</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="cursor-pointer p-0 w-6 h-6 rounded-sm bg-transparent border-none hover:bg-transparent"
                  >
                    <TrashIcon className="w-4 h-4 text-white" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete Column</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div
            className="flex flex-col px-3 space-y-3 overflow-y-auto flex-1"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {todos?.length > 0
              ? todos.map((todo) => <TodoCard key={todo.id} todo={todo} />)
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};
