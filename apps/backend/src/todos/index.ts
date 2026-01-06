import { Elysia, t } from 'elysia';
import { TodoService } from './service';
import { TodoModel } from './model';

export const todos = new Elysia({ prefix: '/todos' })
  .get('/', async () => {
    return await TodoService.getAll();
  }, {
    response: t.Array(TodoModel.response),
    detail: {
      summary: 'Get all todos',
      tags: ['todos'],
    },
  })
  .get('/:id', async ({ params }) => {
    const todo = await TodoService.getById(Number(params.id));
    if (!todo) {
      throw new Error('Todo not found');
    }
    return todo;
  }, {
    params: t.Object({
      id: t.String(),
    }),
    response: {
      200: TodoModel.response,
      404: TodoModel.error,
    },
    detail: {
      summary: 'Get todo by id',
      tags: ['todos'],
    },
  })
  .post('/', async ({ body }) => {
    return await TodoService.create(body);
  }, {
    body: TodoModel.create,
    response: TodoModel.response,
    detail: {
      summary: 'Create a new todo',
      tags: ['todos'],
    },
  })
  .put('/:id', async ({ params, body }) => {
    const todo = await TodoService.update(Number(params.id), body);
    if (!todo) {
      throw new Error('Todo not found');
    }
    return todo;
  }, {
    params: t.Object({
      id: t.String(),
    }),
    body: TodoModel.update,
    response: {
      200: TodoModel.response,
      404: TodoModel.error,
    },
    detail: {
      summary: 'Update a todo',
      tags: ['todos'],
    },
  })
  .delete('/:id', async ({ params }) => {
    const deleted = await TodoService.delete(Number(params.id));
    if (!deleted) {
      throw new Error('Todo not found');
    }
    return { success: true };
  }, {
    params: t.Object({
      id: t.String(),
    }),
    response: {
      200: t.Object({
        success: t.Boolean(),
      }),
      404: TodoModel.error,
    },
    detail: {
      summary: 'Delete a todo',
      tags: ['todos'],
    },
  });
