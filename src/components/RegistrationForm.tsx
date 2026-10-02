import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Upload, X } from "lucide-react";
import type { ClientData } from "@/App";

interface RegistrationFormProps {
  plan: "monthly" | "quarterly";
  onComplete: (client: ClientData) => void;
  onBack: () => void;
}

export function RegistrationForm({ plan, onComplete, onBack }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    height: "",
    weight: "",
    phone: "",
    email: "",
    goal: "",
    notes: "",
  });
  const [photos, setPhotos] = useState<string[]>([]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setPhotos((prev) => [...prev, event.target.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = () => {
    const client: ClientData = {
      ...formData,
      photos,
      plan,
      status: "pending",
      workouts: [],
      meals: [],
      weightLogs: [{ date: new Date().toISOString(), weight: parseFloat(formData.weight) || 0 }],
    };
    onComplete(client);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" className="mb-6 text-slate-400 hover:text-emerald-400" onClick={onBack}>
          <ArrowRight className="w-4 h-4 ml-2" />
          رجوع
        </Button>

        <Card className="bg-slate-900 border-emerald-500/20">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-100">تسجيل البيانات</CardTitle>
            <p className="text-slate-400">
              {plan === "monthly" ? "باقة المتابعة الشهرية" : "باقة المتابعة 3 شهور"}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Personal Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-emerald-400">البيانات الشخصية</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">الاسم بالكامل</Label>
                  <Input
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-slate-100"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">العمر</Label>
                  <Input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-slate-100"
                    placeholder="مثال: 25"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">الطول (سم)</Label>
                  <Input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-slate-100"
                    placeholder="مثال: 175"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">الوزن الحالي (كجم)</Label>
                  <Input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-slate-100"
                    placeholder="مثال: 80"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">رقم الهاتف</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-slate-100"
                    placeholder="01xxxxxxxxx"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">البريد الإلكتروني</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-slate-100"
                    placeholder="example@email.com"
                  />
                </div>
              </div>
            </div>

            {/* Goal */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-emerald-400">الهدف الرياضي</h3>
              <div className="space-y-2">
                <Label className="text-slate-300">اختر هدفك</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, goal: value })}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                    <SelectValue placeholder="اختر الهدف" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="lose" className="text-slate-100">خسارة وزن</SelectItem>
                    <SelectItem value="muscle" className="text-slate-100">زيادة كتلة عضلية</SelectItem>
                    <SelectItem value="fitness" className="text-slate-100">تحسين اللياقة</SelectItem>
                    <SelectItem value="health" className="text-slate-100">صحة عامة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">ملاحظات إضافية</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-slate-100 min-h-[100px]"
                  placeholder="أي معلومات إضافية تود مشاركتها..."
                />
              </div>
            </div>

            {/* Photos */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-emerald-400">صور الجسم الحالية</h3>
              <div className="space-y-2">
                <Label className="text-slate-300">ارفع صوراً لمتابعة تطورك</Label>
                <div className="flex flex-wrap gap-4">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative w-24 h-24">
                      <img src={photo} alt={`صورة ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                      <button
                        onClick={() => setPhotos(photos.filter((_, i) => i !== index))}
                        className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-emerald-500/30 rounded-lg cursor-pointer hover:border-emerald-500/60 transition-colors">
                    <Upload className="w-6 h-6 text-emerald-400" />
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoUpload} />
                  </label>
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-lg py-6"
              onClick={handleSubmit}
              disabled={!formData.fullName || !formData.phone || !formData.email}
            >
              متابعة للدفع
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}