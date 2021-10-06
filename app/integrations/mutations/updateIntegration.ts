import { resolver } from "blitz"
import db from "db"
import { UpdateIntegration } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateIntegration),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const integration = await db.integration.update({ where: { id }, data })

    return integration
  }
)
