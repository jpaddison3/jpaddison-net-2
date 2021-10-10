import {
  AuthenticatedMiddlewareCtx,
  Ctx,
  dehydrate,
  getQueryKey,
  GetServerSidePropsContext,
  invokeWithMiddleware,
  QueryClient,
} from "blitz"
import db, { User } from "db"
import getCurrentUserQuery from "./queries/getCurrentUser"

export async function getCurrentUser({ session }: AuthenticatedMiddlewareCtx): Promise<User>
export async function getCurrentUser({ session }: Ctx): Promise<User | null>
export async function getCurrentUser({ session }: Ctx): Promise<User | null> {
  if (!session.userId) return null

  const user = await db.user.findFirst({
    where: { id: session.userId },
  })

  return user
}

export type CurrentUser = {
  id: number
  name: string | null
  email: string
  role: string
}

export async function getCurrentUserServerSideDehydratedState(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient()
  const queryKey = getQueryKey(getCurrentUserQuery)

  await queryClient.prefetchQuery(queryKey, () =>
    invokeWithMiddleware(getCurrentUserQuery, null, context)
  )

  return dehydrate(queryClient)
}
