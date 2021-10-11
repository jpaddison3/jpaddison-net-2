import { Prisma } from "db"
import { GuardBuilder } from "@blitz-guard/core"
import { Ctx } from "@blitzjs/core"
import { HasUserId, MaybeHasUserId } from "app/utils"
import { AuthenticatedMiddlewareCtx } from "@blitzjs/core/server"

type ExtendedResourceTypes = Prisma.ModelName | "note"

// Create own is separate, because it needs a separate guard
type ExtendedAbilityTypes = "read:own" | "create:own" | "edit:own" | "readMultiple:own"

function ownsDocument(ctx: Ctx) {
  return async (document: HasUserId) => {
    return document.userId === ctx.session.userId
  }
}

function forbidNonSelfUserId(ctx: Ctx) {
  return async (document: MaybeHasUserId) => {
    if (!document.userId) {
      // Ok
      return true
    }
    return document.userId === ctx.session.userId
  }
}

export function restricEditToOwnDocument<T>() {
  return async (document: T, ctx: AuthenticatedMiddlewareCtx & { __securedByGuard: boolean }) => {
    let maybeRequiredUserId: { requiredUserId?: number } = { requiredUserId: ctx.session.userId }
    if (ctx.session.role === "ADMIN") {
      maybeRequiredUserId = {}
    }
    ctx.__securedByGuard = true
    return { ...document, ...maybeRequiredUserId }
  }
}

export function restrictQueryToOwnDocuments<
  T extends { where?: U },
  U extends { userId?: number | Prisma.IntFilter }
>() {
  return async (
    { where, ...rest }: T,
    ctx: AuthenticatedMiddlewareCtx & { __securedByGuard: boolean }
  ) => {
    let maybeUserId: { userId?: number } = { userId: ctx.session.userId }
    if (ctx.session.role === "ADMIN" && where?.userId) {
      maybeUserId = {}
    }
    ctx.__securedByGuard = true
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
      can("create:own", "all", forbidNonSelfUserId(ctx))
      can("read:own", "all", ownsDocument(ctx))
      can("edit:own", "all")
    }
  }
)

export default Guard
