import { BlitzApiRequest, BlitzApiResponse } from "@blitzjs/core"
import { getSession } from "@blitzjs/core/server"
import logout from "app/auth/mutations/logout"
import { resolver } from "blitz"

// export default async function customRoute(req: BlitzApiRequest, res: BlitzApiResponse) {
//   const logoutMutation =

//   res.statusCode = 200
//   res.setHeader("Content-Type", "application/json")
//   res.end(JSON.stringify({ userId: session.userId }))
// }

// TODO; no idea if this works (it doesn't)
export default resolver.pipe(async (_, ctx) => await logout({}, ctx))
