import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getIntegration from "app/integrations/queries/getIntegration"
import updateIntegration from "app/integrations/mutations/updateIntegration"
import { IntegrationForm, FORM_ERROR } from "app/integrations/components/IntegrationForm"
import { UpdateIntegration } from "app/integrations/validations"
import JpSuspense from "app/core/components/JpSuspense"

export const EditIntegration = () => {
  const router = useRouter()
  const integrationId = useParam("integrationId", "number")
  const [integration, { setQueryData }] = useQuery(
    getIntegration,
    { id: integrationId },
    {
      // This ensures the query never refreshes and overwrites the form data
      // while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateIntegrationMutation] = useMutation(updateIntegration)

  return (
    <>
      <Head>
        <title>Edit Integration {integration.id}</title>
      </Head>

      <div>
        <h1>Edit Integration {integration.id}</h1>
        <pre>{JSON.stringify(integration, null, 2)}</pre>

        <IntegrationForm
          submitText="Update Integration"
          schema={UpdateIntegration}
          initialValues={integration}
          onSubmit={async (values) => {
            try {
              const updated = await updateIntegrationMutation({
                id: integration.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowIntegrationPage({ integrationId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditIntegrationPage: BlitzPage = () => {
  return (
    <div>
      <JpSuspense name="EditIntegration">
        <EditIntegration />
      </JpSuspense>

      <p>
        <Link href={Routes.IntegrationsPage()}>
          <a>Integrations</a>
        </Link>
      </p>
    </div>
  )
}

EditIntegrationPage.authenticate = true
EditIntegrationPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditIntegrationPage
