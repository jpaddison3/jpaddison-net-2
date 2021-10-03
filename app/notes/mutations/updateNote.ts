import { resolver } from "blitz"
import db from "db"
import { UpdateNote } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateNote),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const note = await db.note.update({ where: { id }, data })

    return note
  }
)
