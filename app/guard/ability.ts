import db, { Prisma } from "db"
import { GuardBuilder } from "@blitz-guard/core"
import { Ctx } from "@blitzjs/core"
import { HasUserId } from "app/utils"

type ExtendedResourceTypes = Prisma.ModelName

type ExtendedAbilityTypes = "manage:own"

const Guard = GuardBuilder<ExtendedResourceTypes, ExtendedAbilityTypes>(
  async (ctx, { can, cannot }) => {
    cannot("manage", "all")
    if (ctx.session.role === "ADMIN") {
      can("manage", "all")
      // return // ?
    }
    can("manage:own", "all", async ({ document }: { document: HasUserId }) => {
      return document.userId === ctx.session.userId
    })
    /*
		Your rules go here, you can start by removing access to everything
		and gradually adding the necessary permissions

		eg:
		cannot("manage", "comment")
		cannot("manage", "article")

		can("read", "article")
		can("read", "comment")

		if (ctx.session.isAuthorized()) {
			can("create", "article")
			can("create", "comment")
			can("send email", "comment")

			can("delete", "comment", async (_args) => {
				return (await db.comment.count({ where: { userId: ctx.session.userId } })) === 1
			})
		}
    */
  }
)

export default Guard
