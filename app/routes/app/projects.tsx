import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { requireUserId } from "~/session.server";
import MainArea from "~/components/MainArea";
import { getProjectListItems } from "~/models/project.server";

type LoaderData = {
  items: Awaited<ReturnType<typeof getProjectListItems>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const items = await getProjectListItems({ userId });
  return json<LoaderData>({ items });
};

export default function NotesPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <MainArea
      items={data.items}
      labelAdd={"+ Create Project"}
      labelEmptyState={"No projects yet"}
    />
  );
}
