import Navbar from "~/components/Navbar";
import { useUser } from "~/utils";

export default function AppPage() {
  const user = useUser();
  return (
    <Navbar
      links={[
        { to: "/app/notes", label: "Notes" },
        { to: "/app/projects", label: "Projects" },
      ]}
      title={user.email}
    />
  );
}
