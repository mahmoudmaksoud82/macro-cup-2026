
"use client";

import { useState, useTransition, useEffect } from "react";
import { registerUser, getUsedFootballOptions } from "@/app/actions/register";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FOOTBALL_OPTIONS, GenderType, SportType } from "@/lib/sports";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, Info, Loader2, Trophy, Users, Phone, Hash, Building2, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function RegistrationForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  
  const [gender, setGender] = useState<GenderType | "">("");
  const [sport, setSport] = useState<SportType | "">("");
  const [sportOption, setSportOption] = useState<string>("");
  const [usedOptions, setUsedOptions] = useState<string[]>([]);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    // Fetch used options on mount and when needed
    async function fetchUsed() {
      const used = await getUsedFootballOptions();
      setUsedOptions(used);
    }
    fetchUsed();
  }, [status]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await registerUser(formData);
      if (result.error) {
        setStatus({ type: 'error', message: result.error });
        toast({
          variant: "destructive",
          title: "خطأ في التسجيل",
          description: result.error,
        });
      } else {
        setStatus({ type: 'success', message: result.success || "تم بنجاح" });
        setGender("");
        setSport("");
        setSportOption("");
        (e.target as HTMLFormElement).reset();
      }
    });
  };

  const availableFootballOptions = FOOTBALL_OPTIONS.filter(opt => !usedOptions.includes(opt));

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-t-4 border-t-primary">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Trophy className="w-10 h-10 text-primary" />
          </div>
        </div>
        <CardTitle className="text-3xl font-headline text-primary">نموذج تسجيل الرياضة</CardTitle>
        <CardDescription className="text-lg">
          سجل بياناتك للمشاركة في الفعاليات الرياضية القادمة
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {status && (
            <Alert variant={status.type === 'error' ? 'destructive' : 'default'} className={status.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : ''}>
              {status.type === 'error' ? <AlertCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4 text-green-600" />}
              <AlertTitle>{status.type === 'error' ? 'خطأ' : 'نجاح'}</AlertTitle>
              <AlertDescription>{status.message}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4 text-accent" /> الاسم بالكامل
              </Label>
              <Input id="name" name="name" required placeholder="أدخل اسمك الثلاثي" className="transition-all focus:ring-2 focus:ring-primary/20" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-accent" /> الإدارة
              </Label>
              <Input id="department" name="department" required placeholder="اسم الإدارة التابع لها" className="transition-all focus:ring-2 focus:ring-primary/20" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maestroCode" className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-accent" /> كود مايسترو
              </Label>
              <Input id="maestroCode" name="maestroCode" required placeholder="كود التعريف الخاص بك" className="transition-all focus:ring-2 focus:ring-primary/20" />
              <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                <Info className="w-3 h-3" /> يمكن التسجيل بهذا الكود مرة واحدة فقط.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationalId" className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-accent" /> الرقم القومي
              </Label>
              <Input id="nationalId" name="nationalId" required placeholder="14 رقم" maxLength={14} className="transition-all focus:ring-2 focus:ring-primary/20" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" /> رقم التواصل
              </Label>
              <Input id="contact" name="contact" required placeholder="رقم الهاتف" className="transition-all focus:ring-2 focus:ring-primary/20" />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" /> النوع
              </Label>
              <Select name="gender" required onValueChange={(val) => setGender(val as GenderType)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر النوع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">رجال</SelectItem>
                  <SelectItem value="female">سيدات</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-accent" /> الرياضة
              </Label>
              <Select name="sport" required onValueChange={(val) => setSport(val as SportType)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الرياضة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="running">رياضة الجري (للجميع)</SelectItem>
                  {gender === 'male' && <SelectItem value="football">كرة قدم (رجال فقط)</SelectItem>}
                  {gender === 'female' && <SelectItem value="penalty">ضربات جزاء (سيدات فقط)</SelectItem>}
                </SelectContent>
              </Select>
            </div>

            {sport === 'football' && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label className="flex items-center gap-2">
                  الاختيار (كرة قدم)
                </Label>
                <Select name="sportOption" required onValueChange={setSportOption}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الاختيار المتاح" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {availableFootballOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                    {availableFootballOptions.length === 0 && (
                      <p className="p-2 text-sm text-center text-muted-foreground">لا توجد خيارات متاحة حالياً</p>
                    )}
                  </SelectContent>
                </Select>
                <p className="text-[11px] text-muted-foreground">الاختيارات تختفي تلقائياً بعد حجزها.</p>
              </div>
            )}
            
            {(sport === 'running' || sport === 'penalty') && (
              <input type="hidden" name="sportOption" value={sport} />
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full py-6 text-lg font-bold bg-primary hover:bg-primary/90 transition-all shadow-lg" 
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                جاري التسجيل...
              </>
            ) : (
              "تأكيد التسجيل"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
