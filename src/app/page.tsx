import RegistrationForm from "@/components/RegistrationForm";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen pb-20 pt-10 relative bg-transparent">
      {/* Admin Link */}
      <div className="absolute top-4 left-4 z-50">
        <Link href="/registrations">
          <Button variant="ghost" className="text-primary hover:bg-primary/10 gap-2">
            <Users className="w-4 h-4" /> عرض المسجلين
          </Button>
        </Link>
      </div>

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
