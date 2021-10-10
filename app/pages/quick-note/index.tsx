import { Head } from "@blitzjs/core/head"
import { Typography } from "@material-ui/core"
import WrappedButton from "app/core/components/WrappedButton"
import Layout from "app/core/layouts/Layout"
import React from "react"

export default function QuickNoteHome() {
  const tagline = "Zero-friction intake into your favorite apps"
  return (
    <>
      <Head>
        <title>Quick Note — {tagline}</title>
      </Head>
      <Layout>
        <Typography variant="h2" component="h1" color="primary">
          Quick Note
        </Typography>

        <Typography variant="h6" gutterBottom>
          {tagline}
        </Typography>

        <WrappedButton variant="contained" href="/quick-note/integrations">
          Integrate with your note apps
        </WrappedButton>
      </Layout>
    </>
  )
}
