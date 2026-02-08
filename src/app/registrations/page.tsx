"use client";

import { useFirestore, useCollection } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { useMemoFirebase } from "@/firebase/provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trophy, Users, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RegistrationsPage() {
  const firestore = useFirestore();

  const q = useMemoFirebase(() => {
    return query(collection(firestore, "registrations"), orderBy("createdAt", "desc"));
  }, [firestore]);

  const { data: registrations, isLoading } = useCollection(q);

  return (
    <main className="min-h-screen pb-20 pt-10 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <LayoutDashboard className="w-4 h-4" /> العودة للتسجيل
            </Button>
          </Link>
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
                      <TableHead className="text-right">الرياضة</TableHead>
                      <TableHead className="text-right">الاختيار</TableHead>
                      <TableHead className="text-right">النوع</TableHead>
                      <TableHead className="text-right">كود مايسترو</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registrations.map((reg) => (
                      <TableRow key={reg.id}>
                        <TableCell className="font-medium">{reg.name}</TableCell>
                        <TableCell>{reg.department}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {reg.sport === 'football' ? 'كرة قدم' : reg.sport === 'penalty' ? 'ضربات جزاء' : 'جري'}
                          </Badge>
                        </TableCell>
                        <TableCell>{reg.sportOption}</TableCell>
                        <TableCell>{reg.gender === 'male' ? 'رجال' : 'سيدات'}</TableCell>
                        <TableCell className="font-mono text-xs">{reg.maestroCode}</TableCell>
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
