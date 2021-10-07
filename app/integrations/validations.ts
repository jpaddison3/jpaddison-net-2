import { z } from "zod"

const Service = z.enum(["ZAPIER"])

export const GetIntegration = z.object({
  // We'll manually throw an error if no present :(
  id: z.number().optional(),
})

export const CreateIntegration = z.object({
  service: Service,
  secret: z.string(),
})

export const UpdateIntegration = CreateIntegration.extend({
  id: z.number(),
})
