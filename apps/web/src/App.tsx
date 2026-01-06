
import { layoutRoute } from "./routes";
import { reatomComponent } from "@reatom/react";


export const App = reatomComponent(() => {
  return <div>{layoutRoute.render()}</div>
})
