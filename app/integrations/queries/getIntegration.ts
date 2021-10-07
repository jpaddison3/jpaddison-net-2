import { canAccess } from "app/auth/permissions"
import Guard from "app/guard/ability"
import { getCurrentUser } from "app/users/helpers"
import { resolver, NotFoundError, AuthenticationError } from "blitz"
import db from "db"
import { GetIntegration } from "../validations"

export default resolver.pipe(
  resolver.zod(GetIntegration),
  resolver.authorize(),
  // Guard.authorizePipe("manage:own", "Integration"),
  async ({ id }, context) => {
    let maybeUserRestriction: any = { userId: context.session.userId }
    // if (context.session.role === "ADMIN") {
    //   maybeUserRestriction = {}
    // }
    const integration = await db.integration.findFirst({
      where: { id, ...maybeUserRestriction },
      // Do not return secret
      select: { id: true, service: true, userId: true },
    })
    console.log("🚀 ~ file: getIntegration.ts ~ line 22 ~ integration", integration)

    // const user = await getCurrentUser(context)

    if (!integration) {
      console.log("notfound for real")
      throw new NotFoundError()
    }
    if (!Guard.can("manage:own", "Integration", context, { document: integration })) {
      console.log("no can do")
      throw new NotFoundError()
    }
    // if (!canAccess(user, integration)) throw new NotFoundError()

    console.log("made it")

    return {
      id: integration.id,
      // Do not return secret
      service: integration.service,
    }
  }
)
