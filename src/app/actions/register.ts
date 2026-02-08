
"use server";

import { revalidatePath } from "next/cache";
import { FOOTBALL_OPTIONS, Registration, GenderType, SportType } from "@/lib/sports";

// Mock database in memory (Note: This will reset on server restart)
// In a real app, you would use Firestore here.
let registrations: Registration[] = [];

export async function getUsedFootballOptions() {
  return registrations
    .filter(r => r.sport === 'football')
    .map(r => r.sportOption);
}

export async function registerUser(formData: FormData) {
  const name = formData.get("name")?.toString() || "";
  const department = formData.get("department")?.toString() || "";
  const maestroCode = formData.get("maestroCode")?.toString() || "";
  const nationalId = formData.get("nationalId")?.toString() || "";
  const contact = formData.get("contact")?.toString() || "";
  const gender = formData.get("gender")?.toString() as GenderType;
  const sport = formData.get("sport")?.toString() as SportType;
  const sportOption = formData.get("sportOption")?.toString() || "";

  // Validation
  if (!name || !department || !maestroCode || !nationalId || !contact || !gender || !sport) {
    return { error: "يرجى ملء جميع البيانات المطلوبة." };
  }

  // Duplicate Maestro Code Check
  if (registrations.some(r => r.maestroCode === maestroCode)) {
    return { error: "هذا الكود مسجل بالفعل ولا يمكن التسجيل مرة أخرى." };
  }

  // Specific Football Logic
  if (gender === 'male' && sport === 'football') {
    if (!FOOTBALL_OPTIONS.includes(sportOption)) {
      return { error: "الاختيار غير صالح لكرة القدم." };
    }
    if (registrations.some(r => r.sport === 'football' && r.sportOption === sportOption)) {
      return { error: "هذا الاختيار تم حجزه بالفعل، يرجى اختيار عنصر آخر." };
    }
  }

  // Create registration
  const newRegistration: Registration = {
    id: Math.random().toString(36).substring(7),
    name,
    department,
    maestroCode,
    nationalId,
    contact,
    gender,
    sport,
    sportOption,
    createdAt: new Date()
  };

  registrations.push(newRegistration);
  
  revalidatePath("/");
  return { success: "تم التسجيل بنجاح!" };
}
