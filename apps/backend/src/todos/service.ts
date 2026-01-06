import { db } from '../db';
import type { TodoCreate, TodoUpdate, TodoResponse } from './model';

export abstract class TodoService {
  static async getAll(): Promise<TodoResponse[]> {
    const result = await db.query(
      'SELECT * FROM todos ORDER BY created_at DESC'
    );
    return result.rows;
  }

  static async getById(id: number): Promise<TodoResponse | null> {
    const result = await db.query('SELECT * FROM todos WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  static async create(data: TodoCreate): Promise<TodoResponse> {
    const result = await db.query(
      'INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *',
      [data.title, data.description || null]
    );
    return result.rows[0];
  }

  static async update(id: number, data: TodoUpdate): Promise<TodoResponse | null> {
    const updates: string[] = [];
    const values: (string | boolean | number)[] = [];
    let paramIndex = 1;

    if (data.title !== undefined) {
      updates.push(`title = $${paramIndex++}`);
      values.push(data.title);
    }
    if (data.description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(data.description);
    }
    if (data.completed !== undefined) {
      updates.push(`completed = $${paramIndex++}`);
      values.push(data.completed);
    }

    if (updates.length === 0) {
      return this.getById(id);
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `
      UPDATE todos
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  static async delete(id: number): Promise<boolean> {
    const result = await db.query('DELETE FROM todos WHERE id = $1 RETURNING id', [id]);
    return result.rows.length > 0;
  }
}
