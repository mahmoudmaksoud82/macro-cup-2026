import type {Metadata} from 'next';
import './globals.css';
import Image from 'next/image';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const metadata: Metadata = {
  title: 'Macro Cup 2026 - Registration',
  description: 'Register for Macro Cup Ramadan 2026',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // نستخدم الصورة المحددة في placeholder-images.json والتي تشير إلى Background.jpeg
  const backgroundImage = '/Background.jpeg';

  return (
    <html lang="ar" dir="rtl" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body min-h-screen relative m-0 p-0 overflow-x-hidden bg-transparent">
        <FirebaseClientProvider>
          {/* طبقة الخلفية - ثابتة وممتدة بالكامل */}
          <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none">
            <Image
              src={backgroundImage}
              alt="App Background"
              fill
              priority
              quality={100}
              className="object-cover"
              sizes="100vw"
            />
            {/* طبقة تظليل خفيفة جداً لتحسين قراءة النصوص دون حجب الصورة */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
          </div>
          
          {/* منطقة المحتوى الرئيسية */}
          <div className="relative z-0 min-h-screen w-full">
            {children}
          </div>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}