import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetIntegration = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetIntegration), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const integration = await db.integration.findFirst({ where: { id } })

  if (!integration) throw new NotFoundError()

  return integration
})
