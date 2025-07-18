'use client';

import { Home, WifiOff } from 'lucide-react';
import Link from 'next/link';

export default function NoInternet() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <WifiOff className="w-20 h-20 text-gray-400 mb-4" />

      <h1 className="text-3xl font-bold mb-2 text-center">
        No Internet Connection
      </h1>

      <p className="text-gray-600 mb-6 text-center max-w-md">
        Please check your network settings and try again.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition"
      >
        <Home className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
}
