import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold">
            DeFi Dashboard
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link href="/about" className="hover:text-blue-600">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};