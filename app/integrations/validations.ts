import { z } from "zod"

const Service = z.enum(["ZAPIER"])

export const GetIntegration = z.object({
  // We'll manually throw an error if not present :(
  id: z.number().optional(),
})

export const GetIntegrations = z.object({
  userId: z.number().optional(),
})

export const CreateIntegration = z.object({
  service: Service,
  webhook: z.string().url(),
  name: z.string().optional(),
})

export const UpdateIntegration = CreateIntegration.extend({
  id: z.number(),
})
