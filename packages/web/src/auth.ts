export type Profile = {
  email: string;
  name: string;
};

export type UserResponse = {
  profile: Profile;
};

export async function getProfile() {
  const res = await fetch(import.meta.env.VITE_APP_API_URL + "/profile");
  if (!res.ok) {
    throw new Error("Error fetching profile");
  }
  const json: UserResponse = await res.json();
  return json;
}
