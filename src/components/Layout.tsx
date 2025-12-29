import React, { type ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 transition-all duration-500 overflow-y-auto bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/sky.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      <div className="w-full max-w-sm md:max-w-3xl relative z-10 transition-all duration-300">
        {children}
      </div>
    </div>
  );
};

export default Layout;
