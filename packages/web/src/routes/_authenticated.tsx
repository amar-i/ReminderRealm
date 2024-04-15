import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

function Login() {
  const { login, register } = useKindeAuth();

  return (
    <div className="login-container">
      <h1>Welcome to Reminder Realm</h1>

      <p>Please login to continue</p>
      <button className="glow-on-hover" onClick={() => login()}>
        Login
      </button>
      <button className="glow-on-hover" onClick={() => register()}>
        Register
      </button>
    </div>
  );
}

const Component = () => {
  const isAuthenticated = useKindeAuth();
  if (!isAuthenticated) {
    return <Login />;
  }
  return <Outlet />;
};

export const Route = createFileRoute("/_authenticated")({
  component: Component,
});
