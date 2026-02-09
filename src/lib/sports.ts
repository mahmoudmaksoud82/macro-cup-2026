
export const FOOTBALL_OPTIONS = [
    "Vividol 1","Synobar 1","Scaro 1","Orovex 1","Lit Up 1","Gold 1","Frost 1","ExtraPanthen 2",
    "Vividol 2","Synobar 2","Scaro 2","Orovex 2","Lit Up 2","Gold 2","Frost 2","ExtraPanthen 3",
    "Vividol 3","Synobar 3","Scaro 3","Orovex 3","Lit Up 3","Gold 3","Frost 3","ExtraPanthen 4",
    "Vividol 4","Synobar 4","Scaro 4","Orovex 4","Lit Up 4","Gold 4","Frost 4","ExtraPanthen 5",
    "Vividol 5","Synobar 5","Scaro 5","Orovex 5","Lit Up 5","Gold 5","Frost 5","ExtraPanthen 6",
    "Vividol 6","Synobar 6","Scaro 6","Orovex 6","Lit Up 6","Gold 6","Frost 6","ExtraPanthen"
];

export const GOVERNORATES = [
  "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "البحر الأحمر", "البحيرة", "الفيوم", 
  "الغربية", "الإسماعيلية", "المنوفية", "المنيا", "القليوبية", "الوادي الجديد", 
  "السويس", "الشرقية", "دمياط", "بورسعيد", "جنوب سيناء", "كفر الشيخ", 
  "مطروح", "قنا", "شمال سيناء", "سوهاج", "بني سويف", "الأقصر", "أسوان", "أسيوط"
];

export const T_SHIRT_SIZES = ["L", "XL", "2XL"];

export type SportType = 'running' | 'football' | 'penalty';
export type GenderType = 'male' | 'female';

export interface Registration {
    id: string;
    name: string;
    department: string;
    jobTitle: string;
    governorate: string;
    maestroCode: string;
    nationalId: string;
    contact: string;
    gender: GenderType;
    sport: SportType;
    sportOption: string;
    tShirtSize?: string;
    createdAt: any;
}
