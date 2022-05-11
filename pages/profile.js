import React from "react";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
    },
  });

  if (status === "loading") {
    return "Loading or not authenticated...";
  }

  return <div>profile</div>;
};

export default Profile;
