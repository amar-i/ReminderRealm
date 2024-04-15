import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: Root,
  }
);

function Root() {
  const { isAuthenticated } = useKindeAuth();
  return (
    <>
      <div className="nav">
        <Link to="/">Todo List</Link>
        <Link to="/about">About</Link>
        {isAuthenticated && <Link to="/profile">Profile</Link>}
      </div>
      <hr />
      <Outlet />
    </>
  );
}
