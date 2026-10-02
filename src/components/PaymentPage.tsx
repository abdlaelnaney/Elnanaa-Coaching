import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, Upload, ArrowRight, CreditCard, Landmark } from "lucide-react";
import { toast } from "sonner";
import type { ClientData } from "@/App";

interface PaymentPageProps {
  client: ClientData;
  onSubmit: (client: ClientData) => void;
  onBack: () => void;
}

export function PaymentPage({ client, onSubmit, onBack }: PaymentPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<"instapay" | "fawry">("instapay");
  const [receipt, setReceipt] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const phoneNumber = "01009611266";

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
    toast.success("تم إرسال طلبك بنجاح! سيتم مراجعة الاشتراك وتفعيل حسابك والبدء في تجهيز خطتك قريبًا.");
    onSubmit(client);
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
            <CardTitle className="text-2xl text-slate-100">بوابة الدفع</CardTitle>
            <p className="text-slate-400">أهلاً {client.fullName}! اختر طريقة الدفع المناسبة</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Payment Methods */}
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

            {/* Phone Number */}
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

            {/* Receipt Upload */}
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

            <Button
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-lg py-6"
              onClick={handleSubmit}
              disabled={!receipt}
            >
              إرسال الطلب
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}