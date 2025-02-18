import { Inter } from 'next/font/google';
import "./globals.css";
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-8 bg-white">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}