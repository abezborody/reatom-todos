import { reatomForm, reatomRoute, wrap, type RouteChild } from "@reatom/core";
import { Home } from "./pages/home";
import { TodoPage } from "./pages/$todoId";
import { Header } from "./components/header/header";
import type { JSX } from "react";
import z from "zod";
import { LoginPage } from "./pages/login";
import { TodosList } from "./pages/todosList";
import { About } from "./pages/about";
import type { TodoResponseDTO } from "@reatom-todos/shared-types";
import { EditTodoPage } from "./pages/edit-todo-form";
import { editTodoSchema } from "./lib/types/edit-todo-schema";
import { toast } from "sonner";



declare module '@reatom/core' {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface RouteChild extends JSX.Element { }
}

export const layoutRoute = reatomRoute({
	render({ outlet }): RouteChild {
		return (
			<div className="p-4 max-w-5xl mx-auto">
				<Header />
				<main className="">
					{outlet().map((child, index) => <div key={index}>{child}</div>)}
				</main>
			</div>
		);
	},
});

export const homeRoute = layoutRoute.reatomRoute({
	path: "",
	render(): RouteChild {
		return <Home key="home" />;
	},
});
export const aboutRoute = layoutRoute.reatomRoute({
	path: "about",
	render(): RouteChild { return <About key='about-page' />; },
});

export const todosRoute = layoutRoute.reatomRoute({
	path: "todos",
	render(): RouteChild {
		return <TodosList />;
	},
	async loader() {
		const todos = await wrap(fetch(`${import.meta.env.VITE_BACKEND_URL}/todos`).then((r) => r.json()));
		return todos as TodoResponseDTO[];
	}
});

export const todoRoute = layoutRoute.reatomRoute({
	path: "todos/:todoId",
	params: z.object({
		todoId: z.string().regex(/^\d+$/).transform(Number),
	}),
	async loader(params) {
		const todo = await wrap(fetch(`${import.meta.env.VITE_BACKEND_URL}/todos/${params.todoId}`).then((r) => r.json()));
		return todo as TodoResponseDTO;
	},
	render({ outlet }): RouteChild {
		return todoRoute.exact() ? <TodoPage key="todo-page" /> : <>{outlet()}</>
	}

});

export const editTodoRoute = todoRoute.reatomRoute({
	path: "edit",
	async loader() {
		const todo = await wrap(todoRoute.loader.data())
		if (!todo) {
			throw new Error("Todo not found")
		}
		const editTodoForm = reatomForm(
			{ title: todo.title, description: todo.description || "" },
			{
				schema: editTodoSchema,
				keepErrorOnChange: true,
				onSubmit: async (values) => {
					// Update the todo
					toast.promise(
						wrap(
							fetch(`${import.meta.env.VITE_BACKEND_URL}/todos/${todo.id}`, {
								method: 'PUT',
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify(values),
							}),
						), {
						loading: "Updating todo...",
						success: async () => {
							console.log()
							// TODO: is it right way to invalidate?
							await todoRoute.loader.retry()
							// await todosRoute.loader.retry()
							await todoRoute.go({ todoId: String(todo.id) })
							return "Todo updated successfully!"
						},
						error: "Failed to update todo",
					})
				},
				name: `editTodoForm`,
			},
		)
		return {
			todo,
			editTodoForm
		}
	},
	render(): RouteChild {
		return <EditTodoPage key='edit-todo-form' />
	}
})

export const loginRoute = layoutRoute.reatomRoute({
	path: "login",
	render(): RouteChild { return <LoginPage />; },
});