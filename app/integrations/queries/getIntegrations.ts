import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetIntegrationsInput
  extends Pick<Prisma.IntegrationFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetIntegrationsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: integrations,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.integration.count({ where }),
      query: (paginateArgs) => db.integration.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      integrations,
      nextPage,
      hasMore,
      count,
    }
  }
)
