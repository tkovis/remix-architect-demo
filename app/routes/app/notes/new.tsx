import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import { validationError } from "remix-validated-form";
import { z } from "zod";
import BasicForm from "~/components/BasicForm";
import { TextInput } from "~/components/TextInput";
import { createNote } from "~/models/note.server";
import { requireUserId } from "~/session.server";

export const validator = withZod(
  z.object({
    title: z.string().min(1, "Title is required"),
    body: z.string().min(1, "Body is required"),
  })
);

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const result = await validator.validate(await request.formData());
  if (result.error) return validationError(result.error);

  const { title, body } = result.data;
  const note = await createNote({ title, body, userId });

  return redirect(`app/notes/${note.id}`);
};

export default function NewNotePage() {
  return (
    <BasicForm validator={validator}>
      <TextInput name="title" label="Title" />
      <TextInput name="body" label="Body" />
    </BasicForm>
  );
}
