import { t } from 'elysia';

export const TodoModel = {
  create: t.Object({
    title: t.String(),
    description: t.Optional(t.String()),
  }),
  update: t.Object({
    title: t.Optional(t.String()),
    description: t.Optional(t.String()),
    completed: t.Optional(t.Boolean()),
  }),
  response: t.Object({
    id: t.Number(),
    title: t.String(),
    description: t.Union([t.String(), t.Null()]),
    completed: t.Boolean(),
    created_at: t.Date(),
    updated_at: t.Date(),
  }),
  error: t.Object({
    error: t.String(),
  }),
};

export type TodoCreate = typeof TodoModel.create.static;
export type TodoUpdate = typeof TodoModel.update.static;
export type TodoResponse = typeof TodoModel.response.static;

