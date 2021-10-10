import { z } from "zod"

export const TakeNote = z.object({
  title: z.string().optional(),
  contents: z.string().optional(),
  // integrationId: z.number(),
})
