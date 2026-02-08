import type {Metadata} from 'next';
import './globals.css';
import Image from 'next/image';

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
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased text-foreground min-h-screen relative">
        {/* Global Background Layer */}
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
          <Image
            src="/Background.jpeg"
            alt="Macro Cup Background"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
        {children}
      </body>
    </html>
  );
}
