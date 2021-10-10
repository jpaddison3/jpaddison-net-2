import { Form, FormProps } from "app/core/components/Form"
import { ReactElement } from "react"
import { z } from "zod"
import { CreateIntegration, UpdateIntegration } from "../validations"
import { Select, TextField } from "mui-rff"
import { MenuItem } from "@material-ui/core"

export { FORM_ERROR } from "app/core/components/Form"

export function IntegrationForm(props: FormProps<typeof CreateIntegration>): ReactElement
export function IntegrationForm(props: FormProps<typeof UpdateIntegration>): ReactElement
export function IntegrationForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    // TODO: Can't figure out how to type this such that incorrectly shaped
    // forms are invalid
    <Form<S> {...props}>
      <Select name="service" label="Service">
        <MenuItem value="ZAPIER">Zapier</MenuItem>
      </Select>
      <TextField name="webhook" label="Webhook URL" />
      <TextField name="name" label="Name" />
    </Form>
  )
}
