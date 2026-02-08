"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FOOTBALL_OPTIONS, GenderType, SportType } from "@/lib/sports";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, Info, Loader2, Trophy, Users, Phone, Hash, Building2, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFirestore, useAuth, useUser, useCollection } from "@/firebase";
import { collection, doc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { initiateAnonymousSignIn } from "@/firebase/non-blocking-login";
import { useMemoFirebase } from "@/firebase/provider";

export default function RegistrationForm() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gender, setGender] = useState<GenderType | "">("");
  const [sport, setSport] = useState<SportType | "">("");
  const [sportOption, setSportOption] = useState<string>("");
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Get all registrations to check for football options uniqueness
  const registrationsQuery = useMemoFirebase(() => {
    return query(collection(firestore, "registrations"));
  }, [firestore]);
  
  const { data: allRegistrations } = useCollection(registrationsQuery);

  const usedOptions = allRegistrations 
    ? allRegistrations.filter(r => r.sport === 'football').map(r => r.sportOption)
    : [];

  useEffect(() => {
    if (!isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [user, isUserLoading, auth]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast({ variant: "destructive", title: "خطأ", description: "يرجى الانتظار حتى يتم تسجيل الدخول." });
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name")?.toString() || "",
      department: formData.get("department")?.toString() || "",
      maestroCode: formData.get("maestroCode")?.toString() || "",
      nationalId: formData.get("nationalId")?.toString() || "",
      contact: formData.get("contact")?.toString() || "",
      gender: gender as GenderType,
      sport: sport as SportType,
      sportOption: sport === 'football' ? sportOption : sport,
    };

    setIsSubmitting(true);
    setStatus(null);

    // Uniqueness Checks
    const maestroQuery = query(collection(firestore, "registrations"), where("maestroCode", "==", data.maestroCode));
    const maestroSnapshot = await getDocs(maestroQuery);
    
    if (!maestroSnapshot.empty) {
      setStatus({ type: 'error', message: "هذا الكود مسجل بالفعل ولا يمكن التسجيل مرة أخرى." });
      setIsSubmitting(false);
      return;
    }

    if (data.sport === 'football' && usedOptions.includes(data.sportOption)) {
      setStatus({ type: 'error', message: "هذا الاختيار تم حجزه بالفعل، يرجى اختيار عنصر آخر." });
      setIsSubmitting(false);
      return;
    }

    const registrationId = user.uid;
    const finalData = {
      ...data,
      id: registrationId,
      createdAt: serverTimestamp(),
    };

    setDocumentNonBlocking(doc(firestore, "registrations", registrationId), finalData, { merge: true });
    
    setStatus({ type: 'success', message: "تم التسجيل بنجاح!" });
    setGender("");
    setSport("");
    setSportOption("");
    (e.target as HTMLFormElement).reset();
    setIsSubmitting(false);
  };

  const availableFootballOptions = FOOTBALL_OPTIONS.filter(opt => !usedOptions.includes(opt));

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-t-4 border-t-primary bg-card/95">
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
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full py-6 text-lg font-bold bg-primary hover:bg-primary/90 transition-all shadow-lg" 
            disabled={isSubmitting || isUserLoading}
          >
            {isSubmitting ? (
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
