import { RouteUrlObject } from "@blitzjs/core"

type Route = {
  id: string
  href: string
  label: string
}

export type NavRoutes = Array<Route>

export const routes: NavRoutes = [
  {
    id: "home",
    href: "/",
    label: "Home",
  },
]

export default routes
