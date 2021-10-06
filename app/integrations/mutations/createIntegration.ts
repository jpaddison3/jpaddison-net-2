import { AuthenticationError, resolver } from "blitz"
import db from "db"
import { CreateIntegration } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateIntegration),
  resolver.authorize(),
  async (input, context) => {
    const user = await db.user.findFirst({ where: { id: context.session.userId } })
    // Shouldn't be necessary given the auth check above, but just to make the
    // type checker happy
    if (!user) {
      throw new AuthenticationError()
    }
    const integration = await db.integration.create({
      data: { ...input, user: { connect: { id: user.id } } },
    })

    return integration
  }
)
