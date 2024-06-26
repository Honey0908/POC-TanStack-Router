import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { z } from 'zod';

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    if (context.auth.isLogged()) {
      // redirect to profile if already logged in 
      throw redirect({
        to: '/profile'
      });
    }
  },
  // validate search params before using it 
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  component: Login,
});

function Login() {
  const router = useRouter();
  const search = Route.useSearch();
  const [username, setUsername] = useState('');
  const { signIn } = useAuth();

  const handleLogin = () => {
    signIn(username);
    // The .invalidate() method in the router framework is used to forcibly invalidate all route matches by triggering their beforeLoad and load functions to be called again. This is useful when you need to forcefully reload a route match
    router.invalidate();
    //here naviagte API can also be used
    router.history.push(search?.redirect ?? "/profile")
  };

  return (
    <div className="h-full bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full mb-4"
        />
        <button
          onClick={handleLogin}
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none w-full"
        >
          Login
        </button>

      </div>
    </div>
  );
}
