import { useTodoBoardStore } from "../store";
import { NewColumn } from "./NewColumn";
import { TodoColumn } from "./TodoColumn";

export const TodoBoard = () => {
  const { columns, getTodosByColumn } = useTodoBoardStore();

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
    </div>
  );
};
