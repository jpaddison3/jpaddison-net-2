import { AuthenticatedMiddlewareCtx, Ctx } from "blitz"
import db, { User } from "db"

export async function getCurrentUser({ session }: AuthenticatedMiddlewareCtx): Promise<User>
export async function getCurrentUser({ session }: Ctx): Promise<User | null>
export async function getCurrentUser({ session }: Ctx): Promise<User | null> {
  if (!session.userId) return null

  const user = await db.user.findFirst({
    where: { id: session.userId },
  })

  return user
}
