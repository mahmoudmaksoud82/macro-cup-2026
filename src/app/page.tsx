import RegistrationForm from "@/components/RegistrationForm";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-sports');

  return (
    <main className="min-h-screen pb-20 relative">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden mb-[-4rem]">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-transparent z-10" />
        {heroImage?.imageUrl && (
          <Image
            src={heroImage.imageUrl}
            alt="Sports Hero"
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2 drop-shadow-md">Registration Champion</h1>
          <p className="text-lg md:text-xl font-medium drop-shadow-sm max-w-2xl">
            شارك في التحدي، أثبت مهاراتك، وكن جزءاً من الحدث الرياضي الأكبر
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 relative z-30">
        <RegistrationForm />
      </div>

      <Toaster />
    </main>
  );
}
