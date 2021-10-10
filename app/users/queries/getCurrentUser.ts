import { Ctx } from "blitz"
import { getCurrentUser } from "../helpers"

export default async function getCurrentUserQuery(_ = null, context: Ctx) {
  const currentUser = await getCurrentUser(context)
  return currentUser
}
