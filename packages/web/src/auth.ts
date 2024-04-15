import { queryOptions } from "@tanstack/react-query";

export type UserProfile = {
  name: string;
  email: string;
};

export type UserResponse = {
  profile: UserProfile;
};

export async function getProfile(): Promise<UserResponse> {
  const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/profile`);

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.error || "Failed to fetch profile");
  }

  return (await res.json()) as UserResponse;
}

export const currentUserQueryOptions = queryOptions({
  queryKey: ["profile"],
  queryFn: getProfile,
  staleTime: Infinity,
});
