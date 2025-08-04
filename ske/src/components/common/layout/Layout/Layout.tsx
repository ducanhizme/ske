import React from 'react';
import Link from 'next/link';

export interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showSidebar?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  showSidebar = false,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                {title || 'SKE App'}
              </h1>
            </div>
            <nav className="flex space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
              <Link href="/profile" className="text-gray-600 hover:text-gray-900">Profile</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex">
        {showSidebar && (
          <aside className="w-64 bg-white shadow-sm min-h-[calc(100vh-4rem)]">
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
        )}

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-600 text-sm">
            © 2024 SKE App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};