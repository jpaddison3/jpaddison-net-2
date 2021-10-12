import { Prisma } from "db"
import { GuardBuilder } from "@blitz-guard/core"
import { Ctx } from "@blitzjs/core"
import { HasUserId, MaybeHasUserId } from "app/utils"
import { AuthenticatedMiddlewareCtx } from "@blitzjs/core/server"

type ExtendedResourceTypes = Prisma.ModelName | "note"

// Create own is separate, because it needs a separate guard
type ExtendedAbilityTypes =
  | "read:own"
  | "read:own:many"
  | "create:own"
  | "edit:own"
  | "readMultiple:own"

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

export function restrictEditToOwnDocument<T>() {
  return (document: T, ctx: AuthenticatedMiddlewareCtx) => {
    let maybeRequiredUserId: { requiredUserId?: number } = { requiredUserId: ctx.session.userId }
    if (ctx.session.role === "ADMIN") {
      maybeRequiredUserId = {}
    }
    return { ...document, ...maybeRequiredUserId }
  }
}

function checkEditRestricted(ctx: Ctx) {
  return async ({ requiredUserId }: { requiredUserId: number }) => {
    if (ctx.session.role === "ADMIN") {
      return true
    }
    return requiredUserId === ctx.session.userId
  }
}

export function restrictQueryToOwnDocuments<
  T extends { where?: U },
  U extends { userId?: number | Prisma.IntFilter }
>() {
  return async ({ where, ...rest }: T, ctx: AuthenticatedMiddlewareCtx) => {
    let maybeUserId: { userId?: number } = { userId: ctx.session.userId }
    // TODO: Permissions for admin impersonation that doesn't break admins
    // personal views
    // if (ctx.session.role === "ADMIN" && adminImpersonation) {
    //   maybeUserId = {}
    // }
    return { where: { ...where, ...maybeUserId }, ...rest }
  }
}

function checkQueryRestricted(ctx: Ctx) {
  return async ({ where }: { where: MaybeHasUserId }) => {
    if (ctx.session.role === "ADMIN") {
      return true
    }
    return where?.userId === ctx.session.userId
  }
}

// You can read and write documents with your userId, and only those documents
const Guard = GuardBuilder<ExtendedResourceTypes, ExtendedAbilityTypes>(
  async (ctx, { can, cannot }) => {
    cannot("manage", "all")
    if (ctx.session.$isAuthorized()) {
      if (ctx.session.role === "ADMIN") {
        can("manage", "all")
      }
      // check before mutation
      can("create:own", "all", forbidNonSelfUserId(ctx))
      // check after query
      can("read:own", "all", ownsDocument(ctx))
      // check before query
      can("read:own:many", "all", checkQueryRestricted(ctx))
      // check before mutation
      can("edit:own", "all", checkEditRestricted(ctx))
    }
  }
)

export default Guard
