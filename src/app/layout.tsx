
import type {Metadata} from 'next';
import './globals.css';
import Image from 'next/image';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export const metadata: Metadata = {
  title: 'Macro Cup 2026 - Registration',
  description: 'Register for Macro Cup Ramadan 2026',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body min-h-screen relative m-0 p-0 overflow-x-hidden">
        <FirebaseClientProvider>
          {/* Background Layer - Fixed and at the bottom */}
          <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none">
            <Image
              src="/Background.jpeg"
              alt="App Background"
              fill
              priority
              quality={100}
              className="object-cover"
              sizes="100vw"
            />
          </div>
          
          {/* Main Content Area - Relative and above background */}
          <div className="relative z-0 min-h-screen w-full">
            {children}
          </div>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
