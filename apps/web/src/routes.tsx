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
					{outlet().map((child) => <div key={child.type.name}>{child}</div>)}
				</main>
			</div>
		);
	},
});

export const homeRoute = layoutRoute.reatomRoute({
	path: "",
	render(): RouteChild {
		return <Home />;
	},
});
export const aboutRoute = layoutRoute.reatomRoute({
	path: "about",
	render(): RouteChild { return <About />; },
});

export const todosRoute = layoutRoute.reatomRoute({
	path: "todos",
	render(): RouteChild {
		return <TodosList />;
	},
	async loader() {
		const todos = await wrap(fetch(`${import.meta.env.VITE_BACKEND_URL}/todos`).then((r) => r.json()));
		console.log(todos)
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
	render(): RouteChild {
		return <TodoPage />;
	},
});

export const editTodo = todoRoute.reatomRoute({
	path: "edit",
	async loader() {
		const todo = todoRoute.loader.data()

		if (!todo) {
			throw new Error("Todo not found")
		}

		const editTodoForm = reatomForm(
			{ name: todo.title, bio: todo?.description },
			{
				onSubmit: async (values) => {
					if (editTodoForm.focus().dirty) {
						await wrap(
							fetch(`/api/todos/${todo.id}`, {
								method: 'PUT',
								body: JSON.stringify(values),
							}),
						)
					}
				},
				name: `editTodoForm#${todo.id}`,
			},
		)
		return {
			todo,
			editTodoForm
		}
	}
})

export const loginRoute = layoutRoute.reatomRoute({
	path: "login",
	render(): RouteChild { return <LoginPage />; },
});