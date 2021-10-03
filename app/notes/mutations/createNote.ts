import { resolver } from "blitz"
import db from "db"
import { CreateNoteWithUser } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateNoteWithUser),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const note = await db.note.create({ data: input })

    return note
  }
)
