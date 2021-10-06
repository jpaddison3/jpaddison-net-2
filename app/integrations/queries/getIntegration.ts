import { canAccess } from "app/auth/permissions"
import { getCurrentUser } from "app/users/helpers"
import { resolver, NotFoundError, AuthenticationError } from "blitz"
import db from "db"
import { GetIntegration } from "../validations"

export default resolver.pipe(
  resolver.zod(GetIntegration),
  resolver.authorize(),
  async ({ id }, context) => {
    let maybeUserRestriction: any = { userId: context.session.userId }
    if (context.session.role === "ADMIN") {
      maybeUserRestriction = {}
    }
    const integration = await db.integration.findFirst({
      where: { id, ...maybeUserRestriction },
      // Do not return secret
      select: { id: true, service: true, userId: true },
    })
    const user = await getCurrentUser(context)

    if (!integration) throw new NotFoundError()
    if (!canAccess(user, integration)) throw new NotFoundError()

    return {
      id: integration.id,
      // Do not return secret
      service: integration.service,
    }
  }
)
