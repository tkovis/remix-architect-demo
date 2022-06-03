import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { deleteProject, getProject } from "~/models/project.server";
import { requireUserId } from "~/session.server";

import type { Project } from "~/models/project.server";

type LoaderData = {
  item: Project;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.projectId, "invalid path parameter");

  const item = await getProject({ userId, id: params.projectId });
  if (!item) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ item });
};

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.projectId, "invalid path parameter");

  await deleteProject({ userId, id: params.projectId });

  return redirect("/app/projects");
};

export default function ProjectDetailsPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.item.title}</h3>
      <p className="py-6">{data.item.description}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Note not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
