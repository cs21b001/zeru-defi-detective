import { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t mt-8 py-4 text-center text-gray-600">
        <p>DeFi Dashboard © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};