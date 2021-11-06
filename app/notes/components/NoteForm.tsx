import { validateZodSchema } from "@blitzjs/core"
import { Form as FinalForm } from "react-final-form"
import { TextField } from "mui-rff"
import React, { Suspense } from "react"
import { TakeNote } from "../validations"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/styles"
import getIntegrations from "app/integrations/queries/getIntegrations"
import { useMutation, usePaginatedQuery } from "blitz"
import JpSuspense from "app/core/components/JpSuspense"
import takeNote from "../mutations/takeNote"
import { FORM_ERROR } from "app/core/components/Form"

export const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: 32,
    marginRight: 32,
  },
  nonTopTextField: {
    marginTop: 16,
  },
  loading: {
    marginTop: 32,
  },
}))

export function NoteForm() {
  const classes = useStyles()
  const [takeNoteMutation] = useMutation(takeNote)

  return (
    <FinalForm
      validate={validateZodSchema(TakeNote)}
      submitText="Take Note"
      onSubmit={async (values) => {
        try {
          await takeNoteMutation(values)
        } catch (error) {
          console.error(error)
          return {
            [FORM_ERROR]: error.toString(),
          }
        }
      }}
      render={({ handleSubmit, submitting, form, submitError }) => (
        <form
          onSubmit={async (event) => {
            await handleSubmit(event)
            form.reset()
          }}
        >
          {submitError && (
            <div role="alert" style={{ color: "red" }}>
              {submitError}
            </div>
          )}

          <TextField name="title" label="Title" />
          <TextField
            name="contents"
            label="Contents"
            multiline
            minRows={3}
            className={classes.nonTopTextField}
          />
          <JpSuspense name="Integrations" className={classes.loading}>
            <Integrations submitting={submitting} form={form} />
          </JpSuspense>
        </form>
      )}
    />
  )
}

function Integrations({ submitting, form }) {
  const classes = useStyles()
  // Paginated because, I dunno, prevention of shenagins, but this should never
  // get even close
  const [{ integrations }] = usePaginatedQuery(getIntegrations, {
    orderBy: { id: "asc" },
    take: 50,
  })

  return (
    <>
      {integrations.map((integration) => (
        <Button
          key={integration.id}
          type="submit"
          disabled={submitting}
          onClick={() => form.change("integrationId", integration.id)}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          {integration.name}
        </Button>
      ))}
    </>
  )
}
