import Guard from "app/guard/ability"
import { getCurrentUser } from "app/users/helpers"
import { resolver } from "blitz"
import db from "db"
import { CreateIntegration } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateIntegration),
  resolver.authorize(),
  Guard.authorizePipe("create:own", "Integration"),
  async (input, context) => {
    const user = await getCurrentUser(context)
    const integration = await db.integration.create({
      data: { ...input, user: { connect: { id: user.id } } },
    })

    return {
      id: integration.id,
      name: integration.name,
      service: integration.service,
      userId: integration.userId,
    }
  }
)
