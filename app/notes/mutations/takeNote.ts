import Guard from "app/guard/ability"
import { AuthorizationError, resolver } from "blitz"
import db from "db"
import { TakeNote } from "../validations"
import fetch from "node-fetch"

export default resolver.pipe(
  resolver.zod(TakeNote),
  resolver.authorize(),
  Guard.authorizePipe("create:own", "note"),
  async ({ title, contents, integrationId }, ctx) => {
    const integration = await db.integration.findFirst({
      where: { id: integrationId },
    })
    if (!integration) {
      throw new Error("Integration not found")
    }
    if (integration.userId !== ctx.session.userId) {
      throw new AuthorizationError()
    }
    console.log("title, contents, integrationId", title, contents, integrationId)
    const response = await fetch(integration.webhook, {
      method: "Post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        contents,
      }),
    })
    console.log("🚀 ~ file: takeNote.ts ~ line 33 ~ response", response)
  }
)
