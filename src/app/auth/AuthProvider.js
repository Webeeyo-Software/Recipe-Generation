import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Adjust this path as needed

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [router]);

  return { user, loading };
};

export default useAuth;
