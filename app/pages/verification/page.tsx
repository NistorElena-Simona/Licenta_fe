"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../components/context/AuthContext'


const VerificationNotification = () => {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth()

  const handleVerificationConfirm = () => {
    router.push('/');
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isLoading, isAuthenticated, router])


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-700 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-200">
          Verification Required
        </h1>
        
        <div className="text-center text-gray-200">
          <p>
            User is created but you need to verify it. Please check your email inbox.
          </p>
        </div>
        
        <div className="pt-4">
          <button
            onClick={handleVerificationConfirm}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
          >
            I verified user
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationNotification;