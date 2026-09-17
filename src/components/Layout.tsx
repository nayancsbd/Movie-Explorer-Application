import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children?: ReactNode;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

export const Layout = ({ children, searchTerm, onSearchChange }: LayoutProps) => {
  return (
    <div className="app-layout min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-600 selection:text-white">
      <Navbar searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <main className="main-content flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};
