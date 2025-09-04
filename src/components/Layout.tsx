import React from 'react';
import { Loader2 } from "lucide-react"

interface LayoutProps {
  children: React.ReactNode
  isLoading?: boolean
}

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
    <Loader2 className="h-12 w-12 animate-spin text-gray-400" /> {/* Centered grey circle */}
    <p className="absolute bottom-20 text-sm opacity-40">Loading...</p> {/* Text at middle-bottom */}
    </div>
  );
}

const Layout: React.FC<LayoutProps> = ({ children, isLoading }) => {
  
  return (
    <>
      {/* Fixed LAYOUT header */}
      <div className="layout-header">
        LAYOUT
      </div>
      
      {/* Main content with top padding to account for fixed header */}
      <main className="pt-8" >
      {children}
      </main>
    </>
  );
};

export default Layout;