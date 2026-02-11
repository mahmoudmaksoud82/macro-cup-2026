"use client";

import { useState, useEffect } from "react";
import RegistrationForm from "@/components/RegistrationForm";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Lock, ShieldCheck, Clock } from "lucide-react";

export default function Home() {
  const [adminCode, setAdminCode] = useState("");
  const [hasMounted, setHasMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    setHasMounted(true);
    // توقيت القاهرة GMT+2
    const targetDate = new Date("2026-02-15T14:00:00+02:00");

    const calculateTime = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return true;
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isExpired: false
        });
        return false;
      }
    };

    calculateTime();
    const timer = setInterval(() => {
      const isOver = calculateTime();
      if (isOver) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen pb-20 pt-10 relative bg-transparent flex flex-col items-center">
      {/* Hero Content */}
      <div className="container mx-auto px-4 mb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-bold font-headline mb-4 text-primary drop-shadow-sm">
          Macro Ramadan Cup 2026
        </h1>
        
        <div className="space-y-6">
          <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-90 text-foreground">
            آخر ميعاد للتسجيل 15 فبراير الأحد 2 ظهراً
          </p>

          {hasMounted && (
            <div className="animate-in fade-in duration-700">
              {!timeLeft.isExpired ? (
                <div className="flex justify-center items-center gap-2 md:gap-6 mt-8" dir="ltr">
                  <div className="flex flex-col items-center bg-white/40 backdrop-blur-sm p-3 md:p-4 rounded-2xl border border-primary/5 min-w-[70px] md:min-w-[100px] shadow-sm">
                    <span className="text-3xl md:text-5xl font-bold text-primary tabular-nums">{timeLeft.days}</span>
                    <span className="text-[10px] md:text-xs uppercase text-muted-foreground font-bold tracking-widest mt-1">Days</span>
                  </div>
                  <span className="text-2xl md:text-4xl font-bold text-primary/20">:</span>
                  <div className="flex flex-col items-center bg-white/40 backdrop-blur-sm p-3 md:p-4 rounded-2xl border border-primary/5 min-w-[70px] md:min-w-[100px] shadow-sm">
                    <span className="text-3xl md:text-5xl font-bold text-primary tabular-nums">{timeLeft.hours.toString().padStart(2, '0')}</span>
                    <span className="text-[10px] md:text-xs uppercase text-muted-foreground font-bold tracking-widest mt-1">Hours</span>
                  </div>
                  <span className="text-2xl md:text-4xl font-bold text-primary/20">:</span>
                  <div className="flex flex-col items-center bg-white/40 backdrop-blur-sm p-3 md:p-4 rounded-2xl border border-primary/5 min-w-[70px] md:min-w-[100px] shadow-sm">
                    <span className="text-3xl md:text-5xl font-bold text-primary tabular-nums">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                    <span className="text-[10px] md:text-xs uppercase text-muted-foreground font-bold tracking-widest mt-1">Mins</span>
                  </div>
                  <span className="text-2xl md:text-4xl font-bold text-primary/20">:</span>
                  <div className="flex flex-col items-center bg-white/40 backdrop-blur-sm p-3 md:p-4 rounded-2xl border border-primary/5 min-w-[70px] md:min-w-[100px] shadow-sm">
                    <span className="text-3xl md:text-5xl font-bold text-primary tabular-nums text-accent">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                    <span className="text-[10px] md:text-xs uppercase text-muted-foreground font-bold tracking-widest mt-1">Secs</span>
                  </div>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-8 py-3 rounded-full font-bold animate-pulse">
                  <Clock className="w-5 h-5" /> انتهى موعد التسجيل الرسمي
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 relative z-30 w-full">
        <RegistrationForm />
      </div>

      {/* Admin Access Section */}
      <div className="mt-12 mb-8 flex flex-col items-center gap-4 w-full max-w-xs px-4">
        {adminCode !== "5050" ? (
          <div className="w-full space-y-2">
            <p className="text-xs text-center text-muted-foreground font-medium">منطقة المسؤولين فقط (Admin Area)</p>
            <div className="relative w-full group">
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 text-primary/40 group-focus-within:text-primary transition-colors" />
              </div>
              <Input
                type="password"
                placeholder="أدخل رمز وصول المسؤول..."
                className="bg-white/40 backdrop-blur-sm border-primary/10 text-center pr-10 rounded-full focus:ring-primary/30 transition-all"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <Link href="/registrations" className="animate-in zoom-in duration-300">
            <Button 
              variant="ghost" 
              className="text-primary hover:bg-primary/10 gap-2 bg-white/40 backdrop-blur-sm border border-primary/10 px-8 py-6 rounded-full shadow-sm transition-all hover:scale-105"
            >
              <ShieldCheck className="w-5 h-5" /> دخول لوحة تحكم المسؤول (Admin)
            </Button>
          </Link>
        )}
      </div>

      <Toaster />
    </main>
  );
}
