import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { ReactElement } from "react"
import { z } from "zod"
import { CreateNote, UpdateNote } from "../validations"
export { FORM_ERROR } from "app/core/components/Form"

export function NoteForm(props: FormProps<typeof CreateNote>): ReactElement
export function NoteForm(props: FormProps<typeof UpdateNote>): ReactElement
export function NoteForm<T extends z.ZodType<any, any>>(props: FormProps<T>) {
  return (
    <Form {...props}>
      <LabeledTextField name="title" label="Title" placeholder="Title" />
      <LabeledTextField name="contents" label="Contents" placeholder="Contents" />
    </Form>
  )
}
