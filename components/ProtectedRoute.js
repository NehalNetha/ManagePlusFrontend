"use client"
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function ProtectRoute({ children }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    // Redirect to the home page if the user is not signed in
    if (!session) {
      window.location.href = '/'; // Redirecting client-side
    }
  }, [session, status]);

  if (status === 'loading') {
    // Display loading spinner or message while checking authentication status
    return <div>Loading...</div>;
  }

  // Render children if the user is signed in or if the authentication status is not 'authenticated'
  return children;
}
