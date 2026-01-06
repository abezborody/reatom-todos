import { reatomComponent } from "@reatom/react";
import { aboutRoute, homeRoute, loginRoute, todosRoute } from "../../routes";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";

export const Header = reatomComponent(() => {
	// const randomId = (Math.random() * 50).toFixed(0);

	return (
		<nav className="mb-8 flex max-w-2xl mx-auto justify-between rounded-lg">
			<div>
				<ButtonGroup>

					<Button size="sm" variant={homeRoute.exact() ? "default" : "outline"} onClick={() => homeRoute.go()}>
						Home
					</Button>
					<Button size="sm" variant={todosRoute.exact() ? "default" : "outline"}
						onClick={() => todosRoute.go()}
					>
						All todos
					</Button>
					<Button size="sm" variant={aboutRoute.exact() ? "default" : "outline"} onClick={() => aboutRoute.go()}>
						About
					</Button>
					{/* <Button size="sm" variant={todoRoute.exact() ? "default" : "outline"}

						onClick={() => todoRoute.go({ todoId: randomId.toString() })}
					>
						Todo
					</Button> */}
				</ButtonGroup>
			</div>
			<Button size="sm" variant="default" onClick={() => loginRoute.go()}>Login</Button>
		</nav>
	);
});
