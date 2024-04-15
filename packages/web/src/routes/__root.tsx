import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { currentUserQueryOptions } from "../auth";
import { QueryClient } from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: Root,
  }
);

function Root() {
  const currentUserQuery = useQuery(currentUserQueryOptions);

  return (
    <>
      <div className="nav">
        <Link to="/about">About</Link>
        {currentUserQuery.data ? <Link to="/">Todo List</Link> : null}
        {currentUserQuery.data ? <Link to="/profile">Profile</Link> : null}
      </div>
      <hr />
      <Outlet />
    </>
  );
}
