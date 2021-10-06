import { z } from "zod"

const Service = z.enum(["ZAPIER"])

export const GetIntegration = z.object({
  id: z.number(),
  service: Service,
  // clientId: z.string().optional(),
})

export const CreateIntegration = z.object({
  service: Service,
  secret: z.string(),
})

export const UpdateIntegration = CreateIntegration.extend({
  id: z.number(),
})
