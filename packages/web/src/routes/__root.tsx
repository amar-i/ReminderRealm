import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { currentUserQueryOptions } from "../auth";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  const currentUserQuery = useQuery(currentUserQueryOptions);

  return (
    <>
      <div className="nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {currentUserQuery.data ? <Link to="/profile">Profile</Link> : null}
      </div>
      <hr />
      <Outlet />
    </>
  );
}
