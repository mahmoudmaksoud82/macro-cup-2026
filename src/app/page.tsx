import RegistrationForm from "@/components/RegistrationForm";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <main className="min-h-screen pb-20 pt-10 relative bg-transparent">
      {/* Hero Content (Without duplicate image) */}
      <div className="container mx-auto px-4 mb-12 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold font-headline mb-4 drop-shadow-2xl">
          Registration Champion
        </h1>
        <p className="text-xl md:text-2xl font-medium drop-shadow-lg max-w-2xl mx-auto opacity-90">
          شارك في التحدي، أثبت مهاراتك، وكن جزءاً من الحدث الرياضي الأكبر
        </p>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 relative z-30">
        <RegistrationForm />
      </div>

      <Toaster />
    </main>
  );
}
