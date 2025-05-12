import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

export default function AdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Welcome to the admin panel. More features coming soon.
          </p>
        </CardContent>
      </div>
    </div>
  );
}
