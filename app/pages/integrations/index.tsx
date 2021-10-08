import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getIntegrations from "app/integrations/queries/getIntegrations"

const ITEMS_PER_PAGE = 100

export const IntegrationsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ integrations, hasMore }] = usePaginatedQuery(getIntegrations, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {integrations.map((integration) => (
          <li key={integration.id}>
            <Link href={Routes.ShowIntegrationPage({ integrationId: integration.id })}>
              <a>{integration.service}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const IntegrationsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Integrations</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewIntegrationPage()}>
            <a>Create Integration</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <IntegrationsList />
        </Suspense>
      </div>
    </>
  )
}

IntegrationsPage.authenticate = true
IntegrationsPage.getLayout = (page) => <Layout>{page}</Layout>

export default IntegrationsPage
