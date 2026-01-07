import { editTodoRoute } from "@/routes"
import { bindField, reatomComponent } from "@reatom/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { todoRoute } from "@/routes"


export const EditTodoPage = reatomComponent(() => {
	// 1. Check if route matches
	if (!editTodoRoute.exact()) return null

	// 2. Check loader readiness
	const isReady = editTodoRoute.loader.ready()
	const data = editTodoRoute.loader.data()
	const error = editTodoRoute.loader.error()

	// 3. Handle loading state
	if (!isReady) return <div>Loading...</div>

	// 4. Handle error state
	if (error) return <div>Error: {error.message}</div>

	// 5. Handle no data
	if (!data) return null

	// 6. Get form and todo data
	const { editTodoForm, todo } = data
	const { fields } = editTodoForm

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		editTodoForm.submit()
	}

	const titleValidation = fields.title.validation()
	const titleInvalid = titleValidation.triggered && !!titleValidation.error

	const descriptionValidation = fields.description.validation()
	const descriptionInvalid = descriptionValidation.triggered && !!descriptionValidation.error

	return (
		<div className="space-y-4 max-w-2xl mx-auto">
			<Button
				variant="ghost"
				size="sm"
				className="gap-2"
				onClick={() => todoRoute.go({ todoId: String(todo.id) })}
			>
				<ArrowLeft className="size-4" />
				Back to Todo
			</Button>

			<Card>
				<CardHeader>
					<CardTitle>Edit Todo</CardTitle>
					<CardDescription>
						Make changes to your todo below. Click save when you're done.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<label
								htmlFor="title"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Title
							</label>
							<input
								id="title"
								{...bindField(fields.title)}
								aria-invalid={titleInvalid}
								className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							/>
							{titleInvalid && (
								<p className="text-sm text-destructive">
									{titleValidation.error}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<label
								htmlFor="description"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Description
							</label>
							<textarea
								id="description"
								{...bindField(fields.description)}
								aria-invalid={descriptionInvalid}
								className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							/>
							{descriptionInvalid && (
								<p className="text-sm text-destructive">
									{descriptionValidation.error}
								</p>
							)}
						</div>

						<Button type="submit" className="w-full" disabled={!editTodoForm.submit.ready()}>
							Save Changes
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	)
})