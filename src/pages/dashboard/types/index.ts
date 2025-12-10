export interface ITodoColumn {
  id: string;
  label: string;
}

export interface ITodo {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  column: ITodoColumn;
  createdAt: Date;
  updatedAt: Date;
}
