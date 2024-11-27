import React from "react";
import { Card } from "../ui/Card";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Schedule Today</h1>
          <p className="mt-2 text-gray-600">
            Hogwarts School of Witchcraft and Wizardry
          </p>
        </header>
        <main>
          <Card>{children}</Card>
        </main>
      </div>
    </div>
  );
};
