import { todosRoute } from "@/routes";
import { reatomComponent } from "@reatom/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Plus } from "lucide-react";


export const TodosList = reatomComponent(() => {
	if (!todosRoute.exact()) return null

	const ready = todosRoute.loader.ready()
	const todos = todosRoute.loader.data()
	const error = todosRoute.loader.error()

	if (!ready) return <div className="flex items-center justify-center p-8 bg-red-500">Loading...</div>
	if (error) return <div className="flex items-center justify-center p-8 text-destructive">Error: {error.message}</div>

	return (
		<div key="todos-list" className="space-y-6 max-w-2xl mx-auto">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Todos</h1>
					<p className="text-muted-foreground mt-1">
						{todos?.length || 0} task{todos?.length !== 1 ? "s" : ""} total
					</p>
				</div>
				<Button className="gap-2">
					<Plus className="size-4" />
					Add Todo
				</Button>
			</div>

			{!todos || todos.length === 0 ? (
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-12">
						<Circle className="size-12 text-muted-foreground mb-4" />
						<p className="text-muted-foreground">No todos yet. Create your first one!</p>
					</CardContent>
				</Card>
			) : (
				<div className="grid gap-4">
					{todos.map((todo) => (
						<a href={`/todos/${todo.id}`}>


							<Card key={todo.id} className="hover:shadow-md transition-shadow">
								<CardContent className="p-6">
									<div className="flex items-start justify-between gap-4">
										<div className="flex items-start gap-3 flex-1 min-w-0">
											<div className="mt-0.5">
												{todo.completed ? (
													<CheckCircle2 className="size-5 text-primary" />
												) : (
													<Circle className="size-5 text-muted-foreground" />
												)}
											</div>
											<div className="flex-1 min-w-0 space-y-1">
												<h3 className={`font-semibold truncate ${todo.completed ? "line-through text-muted-foreground" : ""}`}>
													{todo.title || "Untitled"}
												</h3>
												{todo.description && (
													<p className="text-sm text-muted-foreground line-clamp-2">
														{todo.description}
													</p>
												)}
											</div>
										</div>

										<div className="flex items-center gap-2 shrink-0">
											<Badge variant={todo.completed ? "default" : "secondary"}>
												{todo.completed ? "Done" : "Active"}
											</Badge>

										</div>
									</div>
								</CardContent>
							</Card>
						</a>
					))}
				</div>
			)}
		</div>
	);
});