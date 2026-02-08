"use client";

import { useState } from "react";
import RegistrationForm from "@/components/RegistrationForm";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Users, Lock } from "lucide-react";

export default function Home() {
  const [adminCode, setAdminCode] = useState("");

  return (
    <main className="min-h-screen pb-20 pt-10 relative bg-transparent flex flex-col items-center">
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
      <div className="container mx-auto px-4 relative z-30 w-full">
        <RegistrationForm />
      </div>

      {/* Admin Access Section */}
      <div className="mt-12 mb-8 flex flex-col items-center gap-4 w-full max-w-xs px-4">
        {adminCode !== "5050" ? (
          <div className="relative w-full group">
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <Lock className="w-4 h-4 text-primary/40 group-focus-within:text-primary transition-colors" />
            </div>
            <Input
              type="password"
              placeholder="أدخل رمز الوصول..."
              className="bg-white/40 backdrop-blur-sm border-primary/10 text-center pr-10 rounded-full focus:ring-primary/30 transition-all"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
            />
          </div>
        ) : (
          <Link href="/registrations" className="animate-in zoom-in duration-300">
            <Button 
              variant="ghost" 
              className="text-primary hover:bg-primary/10 gap-2 bg-white/40 backdrop-blur-sm border border-primary/10 px-8 py-6 rounded-full shadow-sm transition-all hover:scale-105"
            >
              <Users className="w-5 h-5" /> عرض قائمة المسجلين
            </Button>
          </Link>
        )}
      </div>

      <Toaster />
    </main>
  );
}
