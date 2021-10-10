import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createIntegration from "app/integrations/mutations/createIntegration"
import { IntegrationForm, FORM_ERROR } from "app/integrations/components/IntegrationForm"
import { CreateIntegration } from "app/integrations/validations"

const NewIntegrationPage: BlitzPage = () => {
  const router = useRouter()
  const [createIntegrationMutation] = useMutation(createIntegration)

  return (
    <div>
      <h1>Create New Integration</h1>

      <IntegrationForm
        submitText="Create Integration"
        schema={CreateIntegration}
        initialValues={{ service: "ZAPIER" }}
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
