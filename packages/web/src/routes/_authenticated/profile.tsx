import { createFileRoute } from "@tanstack/react-router";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { logout, user } = useKindeAuth();
  return (
    <div className="profile-container">
      <h1>Hi, {user?.given_name}!</h1>
      <h1>Email: {user?.email}</h1>
      <div></div>
      <button className="glow-on-hover" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
