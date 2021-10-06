import { Ctx } from "blitz"
import { getCurrentUser } from "../helpers"

export default async function getCurrentUserQuery(_ = null, context: Ctx) {
  return getCurrentUser(context)
}
