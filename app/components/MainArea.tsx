import { Link, NavLink, Outlet } from "@remix-run/react";

interface MainAreaProps {
  items: Array<{ id: string; title: string }>;
  labelAdd: string;
  labelEmptyState: string;
}

export default function MainArea({
  items,
  labelAdd,
  labelEmptyState,
}: MainAreaProps) {
  return (
    <main className="flex h-full bg-white">
      <div className="h-full w-80 border-r bg-gray-50">
        <Link to="new" className="block p-4 text-xl text-blue-500">
          {labelAdd}
        </Link>

        <hr />

        {items.length === 0 ? (
          <p className="p-4">{labelEmptyState}</p>
        ) : (
          <ol>
            {items.map((item) => (
              <li key={item.id}>
                <NavLink
                  className={({ isActive }) =>
                    `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                  }
                  to={item.id}
                >
                  📝 {item.title}
                </NavLink>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </main>
  );
}
