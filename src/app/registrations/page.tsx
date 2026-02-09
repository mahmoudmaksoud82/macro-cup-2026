
"use client";

import { useFirestore, useCollection, deleteDocumentNonBlocking } from "@/firebase";
import { collection, query, orderBy, doc } from "firebase/firestore";
import { useMemoFirebase } from "@/firebase/provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trophy, Users, LayoutDashboard, Download, Trash2, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function RegistrationsPage() {
  const firestore = useFirestore();
  const { toast } = useToast();

  const q = useMemoFirebase(() => {
    return query(collection(firestore, "registrations"), orderBy("createdAt", "desc"));
  }, [firestore]);

  const { data: registrations, isLoading } = useCollection(q);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`هل أنت متأكد من حذف تسجيل "${name}"؟`)) {
      deleteDocumentNonBlocking(doc(firestore, "registrations", id));
      toast({
        title: "تم الحذف",
        description: `تم حذف تسجيل ${name} بنجاح.`,
      });
    }
  };

  const downloadExcel = () => {
    if (!registrations || registrations.length === 0) return;

    const headers = [
      "الاسم",
      "الإدارة",
      "المحافظة",
      "الرياضة",
      "الاختيار",
      "النوع",
      "كود مايسترو",
      "الرقم القومي",
      "رقم التواصل",
      "تاريخ التسجيل"
    ];

    const csvRows = [
      headers.join(","),
      ...registrations.map(reg => {
        const sportLabel = reg.sport === 'football' ? 'كرة قدم' : reg.sport === 'penalty' ? 'ضربات جزاء' : 'جري';
        const genderLabel = reg.gender === 'male' ? 'رجال' : 'سيدات';
        const date = reg.createdAt?.toDate ? reg.createdAt.toDate().toLocaleString('ar-EG') : '';
        
        return [
          `"${reg.name}"`,
          `"${reg.department}"`,
          `"${reg.governorate || ''}"`,
          `"${sportLabel}"`,
          `"${reg.sportOption}"`,
          `"${genderLabel}"`,
          `"${reg.maestroCode}"`,
          `"${reg.nationalId}"`,
          `"${reg.contact}"`,
          `"${date}"`
        ].join(",");
      })
    ];

    const csvContent = "\ufeff" + csvRows.join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `registrations_macro_cup_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen pb-20 pt-10 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <LayoutDashboard className="w-4 h-4" /> العودة للتسجيل
              </Button>
            </Link>
            <Button 
              onClick={downloadExcel} 
              variant="secondary" 
              className="gap-2 bg-green-600 hover:bg-green-700 text-white border-none"
              disabled={!registrations || registrations.length === 0}
            >
              <Download className="w-4 h-4" /> تحميل Excel
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
            <Trophy className="w-8 h-8" /> قائمة المسجلين
          </h1>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" /> إجمالي المسجلين: {registrations?.length || 0}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <p className="text-lg font-medium">جاري تحميل البيانات...</p>
              </div>
            ) : registrations && registrations.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">الاسم</TableHead>
                      <TableHead className="text-right">الإدارة</TableHead>
                      <TableHead className="text-right">المحافظة</TableHead>
                      <TableHead className="text-right">الرياضة</TableHead>
                      <TableHead className="text-right">النوع</TableHead>
                      <TableHead className="text-right">كود مايسترو</TableHead>
                      <TableHead className="text-center">إجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registrations.map((reg) => (
                      <TableRow key={reg.id}>
                        <TableCell className="font-medium">{reg.name}</TableCell>
                        <TableCell>{reg.department}</TableCell>
                        <TableCell>{reg.governorate}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {reg.sport === 'football' ? 'كرة قدم' : reg.sport === 'penalty' ? 'ضربات جزاء' : 'جري'}
                          </Badge>
                        </TableCell>
                        <TableCell>{reg.gender === 'male' ? 'رجال' : 'سيدات'}</TableCell>
                        <TableCell className="font-mono text-xs">{reg.maestroCode}</TableCell>
                        <TableCell className="text-center">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(reg.id, reg.name)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">لا يوجد مسجلين حتى الآن.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
