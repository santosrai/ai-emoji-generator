"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export function UserProfileInitializer() {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      fetch('/api/user/profile')
        .then(response => response.json())
        .then(data => console.log('User profile:', data))
        .catch(error => console.error('Error fetching user profile:', error));
    }
  }, [isSignedIn, user]);

  return null; // This component doesn't render anything
}