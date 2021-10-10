import { validateZodSchema } from "@blitzjs/core"
import { Form as FinalForm } from "react-final-form"
import { TextField } from "mui-rff"
import React from "react"
import { TakeNote } from "../validations"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/styles"

export const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: 32,
  },
  nonTopTextField: {
    marginTop: 16,
  },
}))

export function NoteForm() {
  const integrations = [{ name: "Zapier", id: 2 }]
  const classes = useStyles()

  return (
    <FinalForm
      validate={validateZodSchema(TakeNote)}
      submitText="Take Note"
      onSubmit={(values) => console.log(values)}
      render={({ handleSubmit, submitting, form, submitError }) => (
        <form onSubmit={handleSubmit}>
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
        </form>
      )}
    />
  )
}
