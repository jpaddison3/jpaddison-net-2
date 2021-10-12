import Guard, { restrictQueryToOwnDocuments } from "app/guard/ability"
import { AuthenticatedMiddlewareCtx, paginate, resolver } from "blitz"
import db, { Prisma } from "db"
import { GetIntegrations } from "../validations"

interface GetIntegrationsInput
  extends Pick<Prisma.IntegrationFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.zod<typeof GetIntegrations, GetIntegrationsInput>(GetIntegrations),
  resolver.authorize<GetIntegrationsInput>(),
  restrictQueryToOwnDocuments<GetIntegrationsInput, Prisma.IntegrationWhereInput>(),
  Guard.authorizePipe("read:own:many", "Integration"),
  async (
    { where, orderBy, skip = 0, take = 100 }: GetIntegrationsInput,
    context: AuthenticatedMiddlewareCtx
  ) => {
    const whereWithUserId = { userId: context.session.userId, ...where }
    const {
      items: integrations,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.integration.count({ where: whereWithUserId }),
      query: (paginateArgs) =>
        db.integration.findMany({
          ...paginateArgs,
          where: whereWithUserId,
          orderBy,
          select: { id: true, userId: true, service: true, name: true },
        }),
    })

    return {
      integrations,
      nextPage,
      hasMore,
      count,
    }
  }
)
