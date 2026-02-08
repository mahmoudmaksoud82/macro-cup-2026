import RegistrationForm from "@/components/RegistrationForm";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <main className="min-h-screen pb-20 pt-10 relative bg-transparent">
      {/* Hero Content */}
      <div className="container mx-auto px-4 mb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-bold font-headline mb-4 text-primary drop-shadow-sm">
          Registration Champion
        </h1>
        <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-90 text-foreground">
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