import { Form, Link, Outlet } from "@remix-run/react";
import { useUser } from "~/utils";

interface AppPageProps {
  links: Array<{ to: string; label: string }>;
  title: string;
}

export default function Navbar({ links, title }: AppPageProps) {
  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          {links.map(({ to, label }, idx) => (
            <Link className={idx === 0 ? "" : "ml-8"} key={to} to={to}>
              {label}
            </Link>
          ))}
        </h1>
        <p>{title}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <Outlet />
    </div>
  );
}
