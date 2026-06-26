import { createRootRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl p-6">{children}</div>
      </div>
    </QueryClientProvider>
  );
}

export const Route = createRootRoute({
  component: () => (
    <AdminShell>
      <Outlet />
    </AdminShell>
  ),
  errorComponent: ({ error }: { error: unknown }) => (
    <div className="p-6 text-red-600">Error: {String(error)}</div>
  ),
  notFoundComponent: () => <div className="p-6">Admin page not found</div>,
});

export default function _root() {
  return null;
}
