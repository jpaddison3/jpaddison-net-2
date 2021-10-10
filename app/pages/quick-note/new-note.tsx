import Typography from "@material-ui/core/Typography"
import Layout from "app/core/layouts/Layout"
import { NoteForm } from "app/notes/components/NoteForm"
import { Head } from "blitz"
import React from "react"
export default function NewNotePage() {
  return (
    <>
      <Head>
        <title>Take a quick note</title>
      </Head>
      <Layout>
        <Typography variant="h2" component="h1" color="primary" gutterBottom>
          Take a quick note
        </Typography>
        <NoteForm />
      </Layout>
    </>
  )
}
