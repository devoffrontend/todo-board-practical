import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ITodo, ITodoColumn } from "../types";

interface ITodoBoardStore {
  columns: ITodoColumn[];
  todos: ITodo[];

  // Column related methods
  addColumn: (label: string) => void;
  removeColumn: (columnId: string) => void;
  updateColumn: (columnId: string, label: string) => void;

  // Todo related methods
  addTodo: (todo: Omit<ITodo, "id" | "createdAt" | "updatedAt">) => void;
  removeTodo: (todoId: string) => void;
  updateTodo: (
    todoId: string,
    updates: Partial<Omit<ITodo, "id" | "createdAt" | "updatedAt">>
  ) => void;
  moveTodo: (todoId: string, targetColumnId: string) => void;

  // Utility related methods
  getTodosByColumn: (columnId: string) => ITodo[];
  getColumnById: (columnId: string) => ITodoColumn | undefined;
}

// Helper function to generate unique IDs
const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Initial default columns
const initialColumns: ITodoColumn[] = [
  { id: "todo", label: "To Do" },
  { id: "in-progress", label: "In Progress" },
  { id: "done", label: "Done" },
];

// Initial default todos
const initialTodos: ITodo[] = [
  {
    id: generateId(),
    title: "Welcome to Todo Board",
    description:
      "This is your first todo item. You can drag and drop todos between columns.",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    column: initialColumns[0],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: generateId(),
    title: "Complete project setup",
    description: "Set up the development environment and install dependencies.",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    column: initialColumns[1],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: generateId(),
    title: "Review code",
    description: "Review the codebase and understand the architecture.",
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    column: initialColumns[2],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const useTodoBoardStore = create<ITodoBoardStore>()(
  persist(
    (set, get) => ({
      columns: initialColumns,
      todos: initialTodos,

      // Column related methods
      addColumn: (label: string) => {
        const newColumn: ITodoColumn = {
          id: generateId(),
          label,
        };
        set((state) => ({
          columns: [...state.columns, newColumn],
        }));
      },

      removeColumn: (columnId: string) => {
        set((state) => {
          // Remove todos that belong to this column
          const filteredTodos = state.todos.filter(
            (todo) => todo.column.id !== columnId
          );

          // Remove the column
          const filteredColumns = state.columns.filter(
            (column) => column.id !== columnId
          );

          return {
            columns: filteredColumns,
            todos: filteredTodos,
          };
        });
      },

      updateColumn: (columnId: string, label: string) => {
        set((state) => ({
          columns: state.columns.map((column) =>
            column.id === columnId ? { ...column, label } : column
          ),
          // Also update todos that reference this column
          todos: state.todos.map((todo) =>
            todo.column.id === columnId
              ? {
                  ...todo,
                  column: { ...todo.column, label },
                  updatedAt: new Date(),
                }
              : todo
          ),
        }));
      },

      // Todo related methods
      addTodo: (todoData) => {
        const column = get().getColumnById(todoData.column.id);
        if (!column) {
          throw new Error(`Column with id ${todoData.column.id} not found`);
        }

        const newTodo: ITodo = {
          ...todoData,
          id: generateId(),
          column,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          todos: [...state.todos, newTodo],
        }));
      },

      removeTodo: (todoId: string) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== todoId),
        }));
      },

      updateTodo: (todoId: string, updates) => {
        set((state) => ({
          todos: state.todos.map((todo) => {
            if (todo.id !== todoId) return todo;

            // If column is being updated, find the new column object
            let updatedColumn = todo.column;
            if (updates.column) {
              const newColumn = get().getColumnById(updates.column.id);
              if (!newColumn) {
                throw new Error(
                  `Column with id ${updates.column.id} not found`
                );
              }
              updatedColumn = newColumn;
            }

            return {
              ...todo,
              ...updates,
              column: updatedColumn,
              updatedAt: new Date(),
            };
          }),
        }));
      },

      moveTodo: (todoId: string, targetColumnId: string) => {
        const targetColumn = get().getColumnById(targetColumnId);
        if (!targetColumn) {
          throw new Error(`Column with id ${targetColumnId} not found`);
        }

        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === todoId
              ? {
                  ...todo,
                  column: targetColumn,
                  updatedAt: new Date(),
                }
              : todo
          ),
        }));
      },

      // Utility related methods
      getTodosByColumn: (columnId: string) => {
        return get().todos.filter((todo) => todo.column.id === columnId);
      },

      getColumnById: (columnId: string) => {
        return get().columns.find((column) => column.id === columnId);
      },
    }),
    {
      name: "todo-board-storage",
    }
  )
);
