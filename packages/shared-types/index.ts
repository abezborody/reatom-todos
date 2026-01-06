export interface TodoCreateDTO {
  title: string;
  description?: string;
}

export interface TodoUpdateDTO {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface TodoResponseDTO {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface TodoAPI {
  getTodos(): Promise<TodoResponseDTO[]>;
  getTodoById(id: number): Promise<TodoResponseDTO>;
  createTodo(data: TodoCreateDTO): Promise<TodoResponseDTO>;
  updateTodo(id: number, data: TodoUpdateDTO): Promise<TodoResponseDTO>;
  deleteTodo(id: number): Promise<{ success: boolean }>;
}