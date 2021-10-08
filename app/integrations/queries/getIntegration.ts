import { canAccess } from "app/auth/permissions"
import Guard from "app/guard/ability"
import { getCurrentUser } from "app/users/helpers"
import { resolver, NotFoundError, AuthenticationError } from "blitz"
import db from "db"
import { GetIntegration } from "../validations"

export default resolver.pipe(
  resolver.zod(GetIntegration),
  resolver.authorize(),
  async ({ id }) => {
    const integration = await db.integration.findFirst({
      where: { id },
      // Do not return secret
      select: { id: true, service: true, userId: true },
    })

    if (!integration) {
      throw new NotFoundError()
    }

    return {
      integration: {
        id: integration.id,
        // Do not return secret
        service: integration.service,
      },
      documentUserId: integration.userId,
    }
  },
  Guard.authorizePipe("manage:own", "Integration")
)
