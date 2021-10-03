import { z } from "zod"
import { ConnectUser, PrismaConnectUser } from "../users/validations"

export const Note = z.object({
  id: z.number(),
  title: z.string(),
  contents: z.string(),
  userId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CreateNote = Note.pick({ title: true, contents: true })
export const CreateNoteWithUser = CreateNote.extend({ user: PrismaConnectUser })

export const UpdateNote = Note.pick({ id: true, title: true, contents: true })
