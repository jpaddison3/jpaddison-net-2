import Guard from "app/guard/ability"
import { resolver, NotFoundError } from "blitz"
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
      id: integration.id,
      // Do not return secret
      service: integration.service,
      userId: integration.userId,
    }
  },
  Guard.authorizePipe("read:own", "Integration")
)
