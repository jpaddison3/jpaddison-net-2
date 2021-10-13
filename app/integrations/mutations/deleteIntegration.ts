import Guard, { restrictEditToOwnDocument } from "app/guard/ability"
import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteIntegration = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteIntegration),
  resolver.authorize(),
  restrictEditToOwnDocument(),
  Guard.authorizePipe("delete:own", "Integration"),
  async ({ id, requiredUserId }) => {
    const integration = await db.integration.deleteMany({ where: { id, userId: requiredUserId } })

    return integration
  }
)
