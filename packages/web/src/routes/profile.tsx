import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

type Profile = {
  user: {
    name: string;
    email: string;
  };
};

type UserResponse = {
  profile: Profile;
};

function Profile() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function getProfile() {
      try {
        const res = await fetch(import.meta.env.VITE_APP_API_URL + "/profile");
        const json: UserResponse = await res.json();
        setProfile(json.profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
    getProfile();
  }, []);

  if (!profile) {
    return <div className="profile-container">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1>{profile.user.name}</h1>
      <p>{profile.user.email}</p>
    </div>
  );
}

export default Profile;
