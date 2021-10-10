import React, { ReactNode, PropsWithoutRef } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import { z } from "zod"
import { validateZodSchema } from "blitz"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/styles"
export { FORM_ERROR } from "final-form"

export const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: 16,
  },
  textField: {
    marginTop: 16,
  },
}))

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  const classes = useStyles()

  return (
    <FinalForm
      initialValues={initialValues}
      validate={validateZodSchema(schema)}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit} className="form" {...props}>
          {children}

          {submitError && (
            <div role="alert" style={{ color: "red" }}>
              {submitError}
            </div>
          )}

          {submitText && (
            <Button
              type="submit"
              disabled={submitting}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              {submitText}
            </Button>
          )}
        </form>
      )}
    />
  )
}

export default Form
