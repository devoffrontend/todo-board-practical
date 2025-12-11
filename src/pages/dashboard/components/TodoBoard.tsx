import { useTodoBoardStore } from "../store";
import { NewColumn } from "./NewColumn";
import { NewTodo } from "./NewTodo";
import { TodoColumn } from "./TodoColumn";

export const TodoBoard = () => {
  const {
    columns,
    getTodosByColumn,
    isNewTodoModalOpen,
    setIsNewTodoModalOpen,
    setEditTodoItem,
    setNewTodoModalColumn,
  } = useTodoBoardStore();

  const handleCloseNewTodoModal = () => {
    setNewTodoModalColumn(null);
    setEditTodoItem(null);
    setIsNewTodoModalOpen(false);
  };

  return (
    <div className="flex w-full flex-col flex-1">
      <div className="flex w-full flex-1 overflow-x-auto">
        <div className="flex flex-1 gap-3 w-full pb-4 overflow-x-auto">
          {Array.isArray(columns) && columns.length > 0
            ? columns.map((column) => (
                <TodoColumn
                  key={column.id}
                  column={column}
                  todos={getTodosByColumn(column.id) || []}
                />
              ))
            : null}
          <NewColumn />
        </div>
      </div>
      <NewTodo isOpen={isNewTodoModalOpen} onClose={handleCloseNewTodoModal} />
    </div>
  );
};
