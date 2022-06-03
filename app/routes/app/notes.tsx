import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { requireUserId } from "~/session.server";
import { getNoteListItems } from "~/models/note.server";
import MainArea from "~/components/MainArea";

type LoaderData = {
  noteListItems: Awaited<ReturnType<typeof getNoteListItems>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const noteListItems = await getNoteListItems({ userId });
  return json<LoaderData>({ noteListItems });
};

export default function NotesPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <MainArea
      items={data.noteListItems}
      labelAdd={"+ Create Note"}
      labelEmptyState={"No notes yet"}
    />
  );
}
