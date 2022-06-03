import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import { validationError } from "remix-validated-form";
import { z } from "zod";
import BasicForm from "~/components/BasicForm";
import { TextInput } from "~/components/TextInput";
import { createProject } from "~/models/project.server";
import { requireUserId } from "~/session.server";

export const validator = withZod(
  z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
  })
);

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const result = await validator.validate(await request.formData());
  if (result.error) return validationError(result.error);

  const { title, description } = result.data;
  const project = await createProject({ title, description, userId });

  return redirect(`app/projects/${project.id}`);
};

export default function NewProjectPage() {
  return (
    <BasicForm validator={validator}>
      <TextInput name="title" label="Title" />
      <TextInput name="description" label="Description" />
    </BasicForm>
  );
}
