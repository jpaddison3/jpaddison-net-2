import Guard from "app/guard/ability"
import { resolver } from "blitz"
import { TakeNote } from "../validations"

export default resolver.pipe(
  resolver.zod(TakeNote),
  resolver.authorize(),
  Guard.authorizePipe("create:own", "note"),
  async ({ title, contents, integrationId }, ctx) => {
    console.log("title, contents, integrationId", title, contents, integrationId)
  }
)
