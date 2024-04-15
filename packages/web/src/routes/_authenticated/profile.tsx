import { createFileRoute } from "@tanstack/react-router";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { logout, user } = useKindeAuth();
  return (
    <div className="profile-container">
      <h1>User Information</h1>
      <h2>
        Hi, <span className="userInfo">{user?.given_name}!</span>
      </h2>
      <h2>
        Email: <span className="userInfo">{user?.email}</span>
      </h2>
      <div></div>
      <button className="glow-on-hover" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
