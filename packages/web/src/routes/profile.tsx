import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { currentUserQueryOptions } from "../auth";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  // Correct usage of useQuery
  const { data, isFetching, error } = useQuery(currentUserQueryOptions);

  // Check if data is being fetched or if there's an error
  if (isFetching) {
    return <div className="profile-container">Getting User...</div>;
  }

  if (error) {
    return <div className="profile-container">{error.message}</div>;
  }

  // Now we access the profile data directly
  const profile = data?.profile;

  // The return statement rendering the data
  return (
    <div className="profile-container">
      <h1>Profile Info</h1>
      <div>
        <div>Name: {profile?.name}</div>
        <div>Email: {profile?.email}</div>
      </div>
    </div>
  );
}

export default Profile;
