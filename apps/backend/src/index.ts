import { Elysia } from "elysia";
import { initDb } from "./db";
import { todos } from "./todos";
import { openapi } from '@elysiajs/openapi'
import { cors } from '@elysiajs/cors'

await initDb();

const app = new Elysia()
  .use(cors())
  .use(openapi())
  .use(todos)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
