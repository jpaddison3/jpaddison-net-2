import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateIntegration = z.object({
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateIntegration),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const integration = await db.integration.create({ data: input })

    return integration
  }
)
