import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Upload, X, Copy, Check, CreditCard, Landmark, User, Target, Camera, Wallet } from "lucide-react";
import { toast } from "sonner";
import type { User } from "@/App";

interface OnboardingFlowProps {
  plan: "monthly" | "quarterly";
  onComplete: (user: User) => void;
  onBack: () => void;
}

export function OnboardingFlow({ plan, onComplete, onBack }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    height: "",
    weight: "",
    phone: "",
    email: "",
    goal: "",
    fitnessLevel: "",
    notes: "",
  });
  const [photos, setPhotos] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"instapay" | "fawry">("instapay");
  const [receipt, setReceipt] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const phoneNumber = "01009611266";

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

  const handleCopy = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    toast.success("تم نسخ الرقم بنجاح");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setReceipt(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const user: User = {
      id: Date.now().toString(),
      ...formData,
      photos,
      plan,
      status: "pending",
      paymentMethod,
      receipt: receipt || undefined,
      workouts: [],
      meals: [],
      weightLogs: [{ date: new Date().toISOString(), weight: parseFloat(formData.weight) || 0 }],
      joinedDate: new Date().toISOString(),
    };
    setShowSuccess(true);
    setTimeout(() => {
      onComplete(user);
    }, 2000);
  };

  const steps = [
    { number: 1, title: "البيانات الشخصية", icon: User },
    { number: 2, title: "الهدف واللياقة", icon: Target },
    { number: 3, title: "صور الجسم", icon: Camera },
    { number: 4, title: "الدفع", icon: Wallet },
  ];

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.fullName && formData.age && formData.height && formData.weight && formData.phone && formData.email;
      case 2:
        return formData.goal && formData.fitnessLevel;
      case 3:
        return photos.length > 0;
      case 4:
        return receipt !== null;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" className="mb-6 text-slate-400 hover:text-emerald-400" onClick={onBack}>
          <ArrowRight className="w-4 h-4 ml-2" />
          رجوع للرئيسية
        </Button>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, index) => (
            <div key={s.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                    step >= s.number
                      ? "bg-emerald-500 border-emerald-500 text-slate-950"
                      : "bg-slate-800 border-slate-700 text-slate-400"
                  }`}
                >
                  <s.icon className="w-5 h-5" />
                </div>
                <span className={`text-xs mt-2 ${step >= s.number ? "text-emerald-400" : "text-slate-500"}`}>
                  {s.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${step > s.number ? "bg-emerald-500" : "bg-slate-700"}`} />
              )}
            </div>
          ))}
        </div>

        <Card className="bg-slate-900 border-emerald-500/20">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-100">
              {plan === "monthly" ? "باقة المتابعة الشهرية" : "باقة المتابعة 3 شهور"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Step 1: Personal Data */}
            {step === 1 && (
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
                    <Label className="text-slate-300">رقم الواتساب</Label>
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
            )}

            {/* Step 2: Goals */}
            {step === 2 && (
              <div className="space-y-6">
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
                  <Label className="text-slate-300">مستوى اللياقة</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, fitnessLevel: value })}>
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                      <SelectValue placeholder="اختر مستواك" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="beginner" className="text-slate-100">مبتدئ</SelectItem>
                      <SelectItem value="intermediate" className="text-slate-100">متوسط</SelectItem>
                      <SelectItem value="advanced" className="text-slate-100">متقدم</SelectItem>
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
            )}

            {/* Step 3: Photos */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-emerald-400">صور الجسم الحالية</h3>
                <p className="text-slate-400 text-sm">ارفع صوراً لمتابعة تطورك (واجهة، خلفية، جانبية)</p>
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
            )}

            {/* Step 4: Payment */}
            {step === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-emerald-400">بوابة الدفع</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod("instapay")}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      paymentMethod === "instapay"
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-slate-700 bg-slate-800 hover:border-emerald-500/50"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <CreditCard className="w-6 h-6 text-emerald-400" />
                      <span className="font-semibold text-slate-100">InstaPay</span>
                    </div>
                    <p className="text-sm text-slate-400">تحويل فوري عبر تطبيق InstaPay</p>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("fawry")}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      paymentMethod === "fawry"
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-slate-700 bg-slate-800 hover:border-emerald-500/50"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Landmark className="w-6 h-6 text-emerald-400" />
                      <span className="font-semibold text-slate-100">فوري Fawry</span>
                    </div>
                    <p className="text-sm text-slate-400">الدفع عبر منافذ فوري</p>
                  </button>
                </div>

                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <Label className="text-slate-300 mb-2 block">رقم التحويل</Label>
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-3xl font-bold text-emerald-400 tracking-wider" dir="ltr">
                      {phoneNumber}
                    </div>
                    <Button
                      variant="outline"
                      className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                      onClick={handleCopy}
                    >
                      {copied ? <Check className="w-4 h-4 ml-2" /> : <Copy className="w-4 h-4 ml-2" />}
                      {copied ? "تم النسخ" : "نسخ الرقم"}
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-slate-300">صورة إيصال التحويل</Label>
                  {receipt ? (
                    <div className="relative">
                      <img src={receipt} alt="إيصال التحويل" className="w-full max-h-64 object-contain rounded-lg bg-slate-800" />
                      <Button
                        variant="outline"
                        className="mt-2 border-red-500/30 text-red-400 hover:bg-red-500/10"
                        onClick={() => setReceipt(null)}
                      >
                        حذف الإيصال
                      </Button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-emerald-500/30 rounded-xl cursor-pointer hover:border-emerald-500/60 transition-colors">
                      <Upload className="w-8 h-8 text-emerald-400 mb-2" />
                      <span className="text-slate-300">اضغط لرفع صورة الإيصال</span>
                      <span className="text-sm text-slate-500">PNG, JPG حتى 5MB</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleReceiptUpload} />
                    </label>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <Button variant="outline" className="border-slate-700 text-slate-400" onClick={() => setStep(step - 1)}>
                  السابق
                </Button>
              ) : (
                <div />
              )}
              {step < 4 ? (
                <Button
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950"
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                >
                  التالي
                </Button>
              ) : (
                <Button
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950"
                  onClick={handleSubmit}
                  disabled={!canProceed()}
                >
                  إرسال الطلب
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-slate-900 border-emerald-500/20 max-w-md w-full">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-6">
                <Check className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-100 mb-4">تم إرسال طلبك بنجاح!</h3>
              <p className="text-slate-400 mb-6">
                سيتم مراجعة الاشتراك وتفعيل حسابك والبدء في تجهيز خطتك قريبًا.
              </p>
              <div className="w-12 h-1 mx-auto bg-emerald-500 rounded-full animate-pulse" />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}