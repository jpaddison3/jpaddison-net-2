import { restrictQueryToOwnDocuments } from "app/guard/ability"
import { Ctx, paginate, resolver } from "blitz"
import db, { Integration, Prisma } from "db"
import { z } from "zod"
import { GetIntegrations } from "../validations"

interface GetIntegrationsInput
  extends Pick<Prisma.IntegrationFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.zod<typeof GetIntegrations, GetIntegrationsInput>(GetIntegrations),
  resolver.authorize<GetIntegrationsInput>(),
  restrictQueryToOwnDocuments<GetIntegrationsInput, Prisma.IntegrationWhereInput>(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetIntegrationsInput, ctx: Ctx) => {
    const {
      items: integrations,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.integration.count({ where: { ...where } }),
      // TODO; don't return secret
      query: (paginateArgs) =>
        db.integration.findMany({
          ...paginateArgs,
          where,
          orderBy,
          select: { id: true, userId: true, service: true },
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
