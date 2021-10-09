import { BlitzApiRequest, BlitzApiResponse } from "@blitzjs/core"
import { getSession } from "@blitzjs/core/server"

export default async function customRoute(req: BlitzApiRequest, res: BlitzApiResponse) {
  try {
    const session = await getSession(req, res)
    if (!session.$isAuthorized()) {
      res.statusCode = 302
      res.setHeader("Location", "/")
      res.end()
      return
    }

    session.$revoke()
    res.statusCode = 302
    res.setHeader("Location", "/")
    res.end()
  } catch (error) {
    console.log(error)
    res.statusCode = 500
    res.end()
  }
}
