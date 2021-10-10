import { RouteUrlObject } from "@blitzjs/core"

type Route = {
  id: string
  href: string
  label: string
  subRoutes?: Route[]
}

export type NavRoutes = Array<Route>

export const routes: NavRoutes = [
  {
    id: "home",
    href: "/",
    label: "Home",
  },
  {
    id: "quick-note",
    href: "/quick-note",
    label: "Quick Note",
    subRoutes: [
      {
        id: "quick-note-integrations",
        href: "/quick-note/integrations",
        label: "Integrations",
      },
    ],
  },
]

export default routes
