import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteIntegration = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteIntegration),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const integration = await db.integration.deleteMany({ where: { id } })

    return integration
  }
)
