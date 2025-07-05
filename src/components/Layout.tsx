
import React from 'react';
import Navbar from './Navbar';
import FloatingShapes from './FloatingShapes';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-blue-50 relative">
      <FloatingShapes />
      <Navbar />
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
