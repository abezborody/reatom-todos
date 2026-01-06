import { Elysia } from "elysia";
import { initDb } from "./db";
import { todos } from "./todos";
import { openapi } from '@elysiajs/openapi'
import { cors } from '@elysiajs/cors'
import { html, Html } from '@elysiajs/html'
import { homePage } from "./homePage";

await initDb();

const app = new Elysia()
  .use(cors())
  .use(openapi())
  .use(html())
  .group('/api', (app) => app
    .use(todos)
  )
  .get("/", homePage)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
