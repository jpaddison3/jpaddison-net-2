import {
  Link,
  useRouter,
  useMutation,
  BlitzPage,
  Routes,
  AuthenticationError,
  GetServerSideProps,
  useQuery,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import createNote from "app/notes/mutations/createNote"
import { NoteForm, FORM_ERROR } from "app/notes/components/NoteForm"
import { CreateNote } from "app/notes/validations"
import React, { Suspense } from "react"
import getCurrentUserQuery from "app/users/queries/getCurrentUser"
import { getCurrentUserServerSideDehydratedState } from "app/users/helpers"
import LoadingWhileSuspended from "app/core/components/LoadingWhileSuspended"

const NewNotePage: BlitzPage = () => {
  const router = useRouter()
  const [createNoteMutation] = useMutation(createNote)
  const [currentUser, { status }] = useQuery(getCurrentUserQuery, null)
  console.log("🚀 ~ file: new.tsx ~ line 15 ~ status", status)
  if (!currentUser) {
    throw new AuthenticationError("Not authenticated")
  }

  return (
    <div>
      <h1>Create New Note</h1>

      <NoteForm
        submitText="Create Note"
        schema={CreateNote}
        onSubmit={async (noteUserInput) => {
          const validatedNote = CreateNote.parse(noteUserInput)
          const validatedNoteWithUser = {
            ...validatedNote,
            user: { connect: { id: currentUser.id } },
          }
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      dehydratedState: await getCurrentUserServerSideDehydratedState(context),
    },
  }
}

NewNotePage.authenticate = true
NewNotePage.getLayout = (page) => (
  <Layout title={"Create New Note"}>
    <Suspense fallback={<LoadingWhileSuspended name="NewNotePage" />}>{page}</Suspense>
  </Layout>
)
NewNotePage.suppressFirstRenderFlicker = true

export default NewNotePage
