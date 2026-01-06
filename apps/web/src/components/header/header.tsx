import { reatomComponent } from "@reatom/react";
import { aboutRoute, homeRoute, loginRoute, todoRoute, todosRoute } from "../../routes";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";

export const Header = reatomComponent(() => {
	// const randomId = (Math.random() * 50).toFixed(0);
	const randomId = 1

	return (
		<nav className="mb-4 flex justify-between bg-slate-100 p-4 rounded-lg">
			<div>
				<ButtonGroup>

					<Button variant={homeRoute.exact() ? "default" : "outline"} onClick={() => homeRoute.go()}>
						Home
					</Button>
					<Button variant={aboutRoute.exact() ? "default" : "outline"} onClick={() => aboutRoute.go()}>
						About
					</Button>
					<Button variant={todosRoute.exact() ? "default" : "outline"}
						onClick={() => todosRoute.go()}
					>
						All todos
					</Button>
					<Button variant={todoRoute.exact() ? "default" : "outline"}

						onClick={() => todoRoute.go({ todoId: randomId.toString() })}
					>
						Todo
					</Button>
				</ButtonGroup>
			</div>
			<Button variant="default" onClick={() => loginRoute.go()}>Login</Button>
		</nav>
	);
});
