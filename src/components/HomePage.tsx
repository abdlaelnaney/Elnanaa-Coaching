import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Dumbbell, Utensils, TrendingUp, Shield, Check, ArrowLeft, User } from "lucide-react";

interface HomePageProps {
  onSubscribe: (plan: "monthly" | "quarterly") => void;
  onAdminClick: () => void;
  onClientLogin: (email: string) => void;
}

export function HomePage({ onSubscribe, onAdminClick, onClientLogin }: HomePageProps) {
  const [loginEmail, setLoginEmail] = useState("");

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-emerald-500/20 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <span className="text-emerald-400 text-xl font-bold">ن</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-emerald-400">Elnanaa</h1>
              <p className="text-xs text-slate-400">تدريب وتغذية</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                  <User className="w-4 h-4 ml-2" />
                  تسجيل الدخول
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-emerald-500/20">
                <DialogHeader>
                  <DialogTitle className="text-slate-100">تسجيل دخول العميل</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">البريد الإلكتروني</Label>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="bg-slate-800 border-slate-700 text-slate-100"
                    />
                  </div>
                  <Button
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950"
                    onClick={() => onClientLogin(loginEmail)}
                  >
                    دخول
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" className="text-slate-400 hover:text-emerald-400" onClick={onAdminClick}>
              لوحة المدرب
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm text-emerald-400">منصة تدريب احترافية</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-100 mb-6 leading-tight">
                ابدأ رحلتك نحو
                <span className="text-emerald-400 block">جسم أفضل وحياة صحية</span>
              </h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                مع Elnanaa Coaching، احصل على برنامج تدريب وتغذية مخصص بالكامل
                لتحقيق أهدافك الرياضية مع متابعة مستمرة من مدربك الخاص.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-lg px-8 py-6"
                  onClick={() => onSubscribe("monthly")}
                >
                  ابدأ الآن
                </Button>
                <Button
                  variant="outline"
                  className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 text-lg px-8 py-6"
                >
                  تعرف على الباقات
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Dumbbell, title: "تمارين مخصصة", desc: "برامج تدريب تناسب مستواك" },
                { icon: Utensils, title: "نظام غذائي", desc: "خطط وجبات متوازنة" },
                { icon: TrendingUp, title: "متابعة تقدم", desc: "سجل وزنك وتطورك" },
                { icon: Shield, title: "دعم مستمر", desc: "تواصل مباشر مع المدرب" },
              ].map((feature) => (
                <Card key={feature.title} className="bg-slate-900/50 border-emerald-500/20 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <feature.icon className="w-8 h-8 text-emerald-400 mb-4" />
                    <h3 className="font-semibold text-slate-100 mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-400">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-100 mb-4">باقات الاشتراك</h2>
            <p className="text-slate-400 text-lg">اختر الباقة المناسبة لبدء رحلتك</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Monthly Plan */}
            <Card className="bg-slate-900 border-emerald-500/20 relative overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-100">المتابعة الشهرية</CardTitle>
                <CardDescription className="text-slate-400">مثالية للبدء والتجربة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-4xl font-bold text-emerald-400">
                  1500 <span className="text-lg text-slate-400">ج.م / شهرياً</span>
                </div>
                <ul className="space-y-3">
                  {["برنامج تدريب مخصص", "نظام غذائي متكامل", "متابعة أسبوعية", "تعديلات مستمرة"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-slate-300">
                      <Check className="w-5 h-5 text-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950"
                  onClick={() => onSubscribe("monthly")}
                >
                  اشترك الآن
                </Button>
              </CardContent>
            </Card>

            {/* Quarterly Plan */}
            <Card className="bg-slate-900 border-emerald-500/50 relative overflow-hidden">
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-sm font-semibold">
                الأكثر توفيراً
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-slate-100">المتابعة 3 شهور</CardTitle>
                <CardDescription className="text-slate-400">النتائج المثالية تحتاج وقت</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-4xl font-bold text-emerald-400">
                  4000 <span className="text-lg text-slate-400">ج.م / 3 شهور</span>
                </div>
                <ul className="space-y-3">
                  {["كل مزايا الباقة الشهرية", "خصم 15%", "تقييم شهري شامل", "أولوية في المواعيد"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-slate-300">
                      <Check className="w-5 h-5 text-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950"
                  onClick={() => onSubscribe("quarterly")}
                >
                  اشترك الآن
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-emerald-500/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">© 2024 Elnanaa Coaching. جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
}