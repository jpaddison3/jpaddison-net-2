import { Prisma } from "db"
import { GuardBuilder } from "@blitz-guard/core"
import { Ctx } from "@blitzjs/core"
import { HasUserId } from "app/utils"
import { AuthenticatedMiddlewareCtx } from "@blitzjs/core/server"

type ExtendedResourceTypes = Prisma.ModelName

type ExtendedAbilityTypes = "manage:own" | "readMultiple:own"

function ownsDocument(ctx: Ctx) {
  return async (document: HasUserId) => {
    return document.userId === ctx.session.userId
  }
}

export function restrictQueryToOwnDocuments<
  T extends { where?: U },
  U extends { userId?: number | Prisma.IntFilter }
>() {
  return async ({ where, ...rest }: T, ctx: AuthenticatedMiddlewareCtx) => {
    let maybeUserId: { userId?: number } = { userId: ctx.session.userId }
    if (ctx.session.role === "ADMIN" && where?.userId) {
      maybeUserId = {}
    }
    return { where: { ...where, ...maybeUserId }, ...rest }
  }
}

// You can read and write documents with your userId, and only those documents
const Guard = GuardBuilder<ExtendedResourceTypes, ExtendedAbilityTypes>(
  async (ctx, { can, cannot }) => {
    console.log("outermost")
    cannot("manage", "all")
    if (ctx.session.$isAuthorized()) {
      console.log("isAuthorized")
      if (ctx.session.role === "ADMIN") {
        can("manage", "all")
      }
      can("manage:own", "all", ownsDocument(ctx))
    }
  }
)

export default Guard
