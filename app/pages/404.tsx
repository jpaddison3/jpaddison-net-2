import ErrorPageComponent from "app/core/components/ErrorPageComponent"
import Layout from "app/core/layouts/Layout"
import { Head } from "blitz"

// ------------------------------------------------------
// This page is rendered if a route match is not found
// ------------------------------------------------------
export default function Page404() {
  const statusCode = 404
  const title = "This page could not be found"

  return (
    <>
      <Head>
        <title>
          {statusCode}: {title}
        </title>
      </Head>
      <Layout>
        <ErrorPageComponent statusCode={statusCode} title={title} />
      </Layout>
    </>
  )
}
