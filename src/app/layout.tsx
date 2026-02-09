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
  // اسم الصورة الموجودة في مجلد public
  const backgroundImage = '/background.png';

  return (
    <html lang="ar" dir="rtl" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body min-h-screen relative m-0 p-0 overflow-x-hidden bg-transparent">
        <FirebaseClientProvider>
          {/* طبقة الخلفية - ثابتة وتحتوي على الصورة ممتدة بالكامل */}
          <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none bg-white">
            <Image
              src={backgroundImage}
              alt="App Background"
              fill
              priority
              quality={100}
              className="object-cover" // تمدد الصورة لتغطية المساحة بالكامل
              sizes="100vw"
            />
            {/* طبقة تظليل خفيفة اختيارية لزيادة وضوح النص */}
            <div className="absolute inset-0 bg-white/5" />
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
