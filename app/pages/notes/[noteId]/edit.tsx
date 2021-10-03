import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getNote from "app/notes/queries/getNote"
import updateNote from "app/notes/mutations/updateNote"
import { NoteForm, FORM_ERROR } from "app/notes/components/NoteForm"
import { UpdateNote } from "app/notes/validations"

export const EditNote = () => {
  const router = useRouter()
  const noteId = useParam("noteId", "number")
  const [note, { setQueryData }] = useQuery(
    getNote,
    { id: noteId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateNoteMutation] = useMutation(updateNote)

  return (
    <>
      <Head>
        <title>Edit Note {note.id}</title>
      </Head>

      <div>
        <h1>Edit Note {note.id}</h1>
        <pre>{JSON.stringify(note, null, 2)}</pre>

        <NoteForm
          submitText="Update Note"
          schema={UpdateNote}
          initialValues={note}
          onSubmit={async (values) => {
            try {
              const updated = await updateNoteMutation({
                id: note.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowNotePage({ noteId: updated.id }))
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

const EditNotePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditNote />
      </Suspense>

      <p>
        <Link href={Routes.NotesPage()}>
          <a>Notes</a>
        </Link>
      </p>
    </div>
  )
}

EditNotePage.authenticate = true
EditNotePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditNotePage
