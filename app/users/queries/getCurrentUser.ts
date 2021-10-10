import { Ctx } from "blitz"
import { getCurrentUser } from "../helpers"

export default async function getCurrentUserQuery(_ = null, context: Ctx) {
  console.log(
    "🚀 ~ file: getCurrentUser.ts ~ line 5 ~ getCurrentUserQuery ~ context",
    context?.session?.$isAuthorized()
  )
  const currentUser = await getCurrentUser(context)
  return currentUser
}
