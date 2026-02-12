
"use client";

import { useFirestore, useCollection, useUser } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { useMemoFirebase } from "@/firebase/provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowRight, ShieldCheck, Clock, Monitor } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface AccessLog {
  id: string;
  accessedAt: any;
  userAgent: string;
}

export default function LogsPage() {
  const firestore = useFirestore();
  const { user } = useUser();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const q = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, "access_logs"), orderBy("accessedAt", "desc"));
  }, [firestore, user]);

  const { data: logs, isLoading } = useCollection<AccessLog>(q);

  const formatDateTime = (accessedAt: any) => {
    if (!accessedAt || !hasMounted) return "-";
    try {
      const date = accessedAt.toDate ? accessedAt.toDate() : new Date(accessedAt);
      if (isNaN(date.getTime())) return "-";
      
      return date.toLocaleString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch (e) {
      return "-";
    }
  };

  return (
    <main className="min-h-screen pb-20 pt-10 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <Link href="/registrations">
            <Button variant="outline" className="gap-2">
              <ArrowRight className="w-4 h-4" /> العودة للقائمة
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
            <ShieldCheck className="w-8 h-8" /> سجل عمليات الوصول
          </h1>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-t-4 border-t-accent">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              إجمالي عمليات الدخول للوحة التحكم: {logs?.length || 0}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading || !user ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <p className="text-lg font-medium">جاري التحميل...</p>
              </div>
            ) : logs && logs.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">وقت الوصول</TableHead>
                      <TableHead className="text-right">بيانات المتصفح / الجهاز</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="whitespace-nowrap font-medium">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            {formatDateTime(log.accessedAt)}
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          <div className="flex items-start gap-2 max-w-md">
                            <Monitor className="w-4 h-4 mt-0.5 shrink-0" />
                            <span className="break-all">{log.userAgent}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                            ناجح
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">لا توجد سجلات دخول حتى الآن.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
