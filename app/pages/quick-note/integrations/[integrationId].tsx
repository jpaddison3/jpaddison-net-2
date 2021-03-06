import React, { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getIntegration from "app/integrations/queries/getIntegration"
import deleteIntegration from "app/integrations/mutations/deleteIntegration"
import { Typography } from "@material-ui/core"

// Note: Currently unused

export const Integration = () => {
  const router = useRouter()
  const integrationId = useParam("integrationId", "number")
  const [deleteIntegrationMutation] = useMutation(deleteIntegration)
  const [integration] = useQuery(getIntegration, { id: integrationId })

  return (
    <>
      <Head>
        <title>{integration.name} | Quick Note</title>
      </Head>

      <div>
        <Typography variant="h2" component="h1" color="primary" gutterBottom>
          Integration
        </Typography>

        <Link href={Routes.EditIntegrationPage({ integrationId: integration.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteIntegrationMutation({ id: integration.id })
              router.push(Routes.IntegrationsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowIntegrationPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.IntegrationsPage()}>
          <a>Integrations</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Integration />
      </Suspense>
    </div>
  )
}

ShowIntegrationPage.authenticate = true
ShowIntegrationPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowIntegrationPage
