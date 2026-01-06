import { reatomComponent } from "@reatom/react";
import { todoRoute, todosRoute } from "../routes";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2, Circle, ArrowLeft } from "lucide-react";

export const TodoPage = reatomComponent(() => {
	if (!todoRoute.exact()) return null

	const ready = todoRoute.loader.ready()
	const todo = todoRoute.loader.data()
	const error = todoRoute.loader.error()
	if (!ready) return <div className="flex items-center justify-center p-8">Loading...</div>
	if (error) return <div className="flex items-center justify-center p-8 text-destructive">Error: {error.message}</div>

	return (
		<div key="todo-page" className="space-y-4 mx-auto max-w-2xl">
			<Button variant="ghost" size="sm" className="gap-2" onClick={() => todosRoute.go()}>
				<ArrowLeft className="size-4" />
				Back to Todos
			</Button>

			<Card className="max-w-2xl">
				<CardHeader>
					<div className="flex items-start justify-between">
						<div className="space-y-2 flex-1">
							<CardTitle className="text-2xl">{todo?.title || "Untitled"}</CardTitle>
							<CardDescription className="flex items-center gap-2">
								<Calendar className="size-4" />
								Todo #{todo?.id}
							</CardDescription>
						</div>
						<Badge variant={todo?.completed ? "default" : "secondary"} className="gap-1.5">
							{todo?.completed ? <CheckCircle2 className="size-3.5" /> : <Circle className="size-3.5" />}
							{todo?.completed ? "Completed" : "In Progress"}
						</Badge>
					</div>
				</CardHeader>

				<CardContent>
					<div className="space-y-4">
						<div>
							<h4 className="text-sm font-medium text-muted-foreground mb-2">Description</h4>
							<p className="text-sm">
								{todo?.description || "No description provided."}
							</p>
						</div>

					</div>
				</CardContent>

				<CardFooter className="gap-2">
					{/* <Button variant="outline" size="sm">
						Edit Todo
					</Button> */}
					<Button variant="default" size="sm">
						{todo?.completed ? "Mark as Incomplete" : "Mark as Complete"}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
});
