import Guard, { restrictEditToOwnDocument } from "app/guard/ability"
import { AuthorizationError, resolver } from "blitz"
import db, { Prisma } from "db"
import { z } from "zod"
import { UpdateIntegration } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateIntegration),
  resolver.authorize(),
  restrictEditToOwnDocument(),
  Guard.authorizePipe("edit:own", "Integration"),
  async ({ id, requiredUserId, ...data }) => {
    const integration = await db.integration.findFirst({ where: { id }, select: { userId: true } })
    if (requiredUserId && integration?.userId !== requiredUserId) {
      throw new AuthorizationError()
    }

    const updatedIntegration = await db.integration.update({ where: { id }, data })

    return {
      id: updatedIntegration.id,
      name: updatedIntegration.name || undefined,
      service: updatedIntegration.service,
      userId: updatedIntegration.userId,
    }
  }
)
