import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createIntegration from "app/integrations/mutations/createIntegration"
import { IntegrationForm, FORM_ERROR } from "app/integrations/components/IntegrationForm"

const NewIntegrationPage: BlitzPage = () => {
  const router = useRouter()
  const [createIntegrationMutation] = useMutation(createIntegration)

  return (
    <div>
      <h1>Create New Integration</h1>

      <IntegrationForm
        submitText="Create Integration"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateIntegration}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const integration = await createIntegrationMutation(values)
            router.push(Routes.ShowIntegrationPage({ integrationId: integration.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.IntegrationsPage()}>
          <a>Integrations</a>
        </Link>
      </p>
    </div>
  )
}

NewIntegrationPage.authenticate = true
NewIntegrationPage.getLayout = (page) => <Layout title={"Create New Integration"}>{page}</Layout>

export default NewIntegrationPage
