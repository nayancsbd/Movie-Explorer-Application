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
    <div className="app-layout">
      <Navbar searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};
