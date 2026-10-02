import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Dumbbell, Utensils, TrendingUp, Shield, Check, User, Flame, Heart, Zap, ArrowLeft } from "lucide-react";

interface LandingPageProps {
  onSubscribe: (plan: "monthly" | "quarterly") => void;
  onAdminLogin: () => void;
  onClientLogin: (email: string) => boolean;
}

export function LandingPage({ onSubscribe, onAdminLogin, onClientLogin }: LandingPageProps) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = () => {
    const success = onClientLogin(loginEmail);
    if (!success) {
      setLoginError("لم يتم العثور على حساب نشط بهذا البريد");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      {/* Header */}
      <header className="relative border-b border-emerald-500/20 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <span className="text-emerald-400 text-2xl font-bold">ن</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-emerald-400">Elnanaa</h1>
              <p className="text-xs text-slate-400">تدريب وتغذية احترافية</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                  <User className="w-4 h-4 ml-2" />
                  سجل دخول
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-emerald-500/20">
                <DialogHeader>
                  <DialogTitle className="text-slate-100 text-xl">تسجيل دخول العميل</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">البريد الإلكتروني</Label>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      value={loginEmail}
                      onChange={(e) => {
                        setLoginEmail(e.target.value);
                        setLoginError("");
                      }}
                      className="bg-slate-800 border-slate-700 text-slate-100"
                    />
                    {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
                  </div>
                  <Button
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950"
                    onClick={handleLogin}
                  >
                    دخول
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" className="text-slate-400 hover:text-emerald-400" onClick={onAdminLogin}>
              لوحة المدرب
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-emerald-400">منصة تدريب رقم 1 في مصر</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-100 mb-6 leading-tight">
              ابدأ رحلتك نحو
              <span className="text-emerald-400 block mt-2">جسم مثالي وحياة صحية</span>
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-xl">
              مع Elnanaa Coaching، احصل على برنامج تدريب وتغذية مخصص بالكامل
              لتحقيق أهدافك الرياضية مع متابعة مستمرة من مدربك الخاص.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-lg px-8 py-6 shadow-lg shadow-emerald-500/20"
                onClick={() => onSubscribe("monthly")}
              >
                اشترك الآن
              </Button>
              <Button
                variant="outline"
                className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 text-lg px-8 py-6"
              >
                تعرف على الباقات
              </Button>
            </div>
            <div className="flex items-center gap-8 mt-8">
              <div>
                <p className="text-3xl font-bold text-emerald-400">+500</p>
                <p className="text-sm text-slate-400">عميل نشط</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-emerald-400">95%</p>
                <p className="text-sm text-slate-400">نسبة النجاح</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-emerald-400">4.9</p>
                <p className="text-sm text-slate-400">تقييم العملاء</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Dumbbell, title: "تمارين مخصصة", desc: "برامج تدريب تناسب مستواك وأهدافك", color: "from-emerald-500/20 to-emerald-500/5" },
              { icon: Utensils, title: "نظام غذائي", desc: "خطط وجبات متوازنة ومحسوبة", color: "from-emerald-500/20 to-emerald-500/5" },
              { icon: TrendingUp, title: "متابعة تقدم", desc: "سجل وزنك وتطورك باستمرار", color: "from-emerald-500/20 to-emerald-500/5" },
              { icon: Shield, title: "دعم مستمر", desc: "تواصل مباشر مع المدرب", color: "from-emerald-500/20 to-emerald-500/5" },
            ].map((feature) => (
              <Card key={feature.title} className="bg-slate-900/50 border-emerald-500/20 backdrop-blur-sm hover:border-emerald-500/40 transition-colors">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-slate-100 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-20 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-100 mb-4">لماذا تختار Elnanaa؟</h2>
            <p className="text-slate-400 text-lg">نقدم لك كل ما تحتاجه لتحقيق أهدافك</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Flame, title: "حرق دهون فعال", desc: "برامج مخصصة لحرق الدهون وبناء العضلات بأحدث الطرق العلمية" },
              { icon: Heart, title: "صحة أفضل", desc: "نظام غذائي متوازن يحسن صحتك العامة ويمنحك الطاقة" },
              { icon: Zap, title: "نتائج سريعة", desc: "خطة تدريب مكثفة ومتابعة مستمرة لتحقيق نتائج ملموسة" },
            ].map((benefit) => (
              <Card key={benefit.title} className="bg-slate-900 border-emerald-500/20">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
                    <benefit.icon className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-3">{benefit.title}</h3>
                  <p className="text-slate-400">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-100 mb-4">باقات الاشتراك</h2>
            <p className="text-slate-400 text-lg">اختر الباقة المناسبة لبدء رحلتك</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Monthly Plan */}
            <Card className="bg-slate-900 border-emerald-500/20 relative overflow-hidden hover:border-emerald-500/40 transition-colors">
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
            <Card className="bg-slate-900 border-emerald-500/50 relative overflow-hidden hover:border-emerald-500/70 transition-colors">
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
      <footer className="relative border-t border-emerald-500/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">© 2024 Elnanaa Coaching. جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
}