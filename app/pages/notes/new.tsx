import { Link, useRouter, useMutation, BlitzPage, Routes, AuthenticationError } from "blitz"
import Layout from "app/core/layouts/Layout"
import createNote from "app/notes/mutations/createNote"
import { NoteForm, FORM_ERROR } from "app/notes/components/NoteForm"
import { CreateNote } from "app/notes/validations"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import React, { Suspense } from "react"
import { CircularProgress } from "@material-ui/core"

const NewNotePage: BlitzPage = () => {
  const router = useRouter()
  const [createNoteMutation] = useMutation(createNote)
  // TODO; why doesn't this load immediately?
  const user = useCurrentUser()
  if (!user) {
    throw new AuthenticationError()
  }

  return (
    <div>
      <h1>Create New Note</h1>

      <NoteForm
        submitText="Create Note"
        schema={CreateNote}
        onSubmit={async (noteUserInput) => {
          const validatedNote = CreateNote.parse(noteUserInput)
          const validatedNoteWithUser = { ...validatedNote, user: { connect: { id: user.id } } }
          try {
            const note = await createNoteMutation(validatedNoteWithUser)
            router.push(Routes.ShowNotePage({ noteId: note.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.NotesPage()}>
          <a>Notes</a>
        </Link>
      </p>
    </div>
  )
}

NewNotePage.authenticate = true
NewNotePage.getLayout = (page) => (
  <Layout title={"Create New Note"}>
    <Suspense fallback={<CircularProgress />}>{page}</Suspense>
  </Layout>
)

export default NewNotePage
