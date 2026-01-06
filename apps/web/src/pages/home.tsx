import { homeRoute } from "@/routes";
import { reatomComponent } from "@reatom/react";

export const Home = reatomComponent(() => {
	if (!homeRoute.exact()) return null
	return <div key="home">This is test project with using reatom v1000 framework.</div>;
});
