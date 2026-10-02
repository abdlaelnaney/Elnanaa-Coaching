import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, Dumbbell, Utensils, Search, Users, Clock, ArrowRight, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { User, Workout, Meal } from "@/App";

interface AdminDashboardProps {
  users: User[];
  onUpdateUser: (user: User) => void;
  onBack: () => void;
}

export function AdminDashboard({ users, onUpdateUser, onBack }: AdminDashboardProps) {
  const [selectedClient, setSelectedClient] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newWorkout, setNewWorkout] = useState({ name: "", sets: "", reps: "", rest: "", notes: "" });
  const [newMeal, setNewMeal] = useState({ type: "breakfast", name: "", items: "", calories: "", protein: "", carbs: "", fats: "" });

  const pendingUsers = users.filter(u => u.status === "pending");
  const activeUsers = users.filter(u => u.status === "active");
  const rejectedUsers = users.filter(u => u.status === "rejected");

  const filteredActiveUsers = activeUsers.filter(u =>
    u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = (user: User) => {
    const updated = { ...user, status: "active" as const };
    onUpdateUser(updated);
    toast.success(`تم تفعيل حساب ${user.fullName}`);
  };

  const handleReject = (user: User) => {
    const updated = { ...user, status: "rejected" as const };
    onUpdateUser(updated);
    toast.error(`تم رفض طلب ${user.fullName}`);
  };

  const handleAddWorkout = () => {
    if (!selectedClient || !newWorkout.name) return;
    const workout: Workout = {
      id: Date.now().toString(),
      ...newWorkout,
      completed: false,
    };
    const updated = {
      ...selectedClient,
      workouts: [...selectedClient.workouts, workout],
    };
    onUpdateUser(updated);
    setSelectedClient(updated);
    setNewWorkout({ name: "", sets: "", reps: "", rest: "", notes: "" });
    toast.success("تم إضافة التمرين");
  };

  const handleAddMeal = () => {
    if (!selectedClient || !newMeal.name) return;
    const meal: Meal = {
      id: Date.now().toString(),
      ...newMeal,
    };
    const updated = {
      ...selectedClient,
      meals: [...selectedClient.meals, meal],
    };
    onUpdateUser(updated);
    setSelectedClient(updated);
    setNewMeal({ type: "breakfast", name: "", items: "", calories: "", protein: "", carbs: "", fats: "" });
    toast.success("تم إضافة الوجبة");
  };

  const handleDeleteWorkout = (workoutId: string) => {
    if (!selectedClient) return;
    const updated = {
      ...selectedClient,
      workouts: selectedClient.workouts.filter(w => w.id !== workoutId),
    };
    onUpdateUser(updated);
    setSelectedClient(updated);
    toast.success("تم حذف التمرين");
  };

  const handleDeleteMeal = (mealId: string) => {
    if (!selectedClient) return;
    const updated = {
      ...selectedClient,
      meals: selectedClient.meals.filter(m => m.id !== mealId),
    };
    onUpdateUser(updated);
    setSelectedClient(updated);
    toast.success("تم حذف الوجبة");
  };

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Button variant="ghost" className="mb-6 text-slate-400 hover:text-emerald-400" onClick={onBack}>
          <ArrowRight className="w-4 h-4 ml-2" />
          رجوع للرئيسية
        </Button>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">لوحة تحكم المدرب</h1>
            <p className="text-slate-400 mt-2">إدارة الاشتراكات وبناء الأنظمة</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-emerald-500/20">
              <Users className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300">{activeUsers.length} عميل نشط</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-emerald-500/20">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300">{pendingUsers.length} طلب معلق</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="bg-slate-900 border border-emerald-500/20">
            <TabsTrigger value="pending" className="text-slate-300 data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950">
              طلبات معلقة ({pendingUsers.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="text-slate-300 data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950">
              عملاء نشطون ({activeUsers.length})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="text-slate-300 data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950">
              مرفوضون ({rejectedUsers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingUsers.length === 0 ? (
              <Card className="bg-slate-900 border-emerald-500/20">
                <CardContent className="p-8 text-center text-slate-400">
                  لا توجد طلبات معلقة حالياً
                </CardContent>
              </Card>
            ) : (
              pendingUsers.map((user) => (
                <Card key={user.id} className="bg-slate-900 border-emerald-500/20">
                  <CardContent className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-slate-100">{user.fullName}</h3>
                        <p className="text-slate-400">الهدف: {user.goal}</p>
                        <div className="flex gap-4 text-sm text-slate-400">
                          <span>العمر: {user.age}</span>
                          <span>الطول: {user.height} سم</span>
                          <span>الوزن: {user.weight} كجم</span>
                        </div>
                        <p className="text-sm text-slate-400">الهاتف: {user.phone}</p>
                        <p className="text-sm text-slate-400">البريد: {user.email}</p>
                        <p className="text-sm text-slate-400">الباقة: {user.plan === "monthly" ? "شهرية" : "3 شهور"}</p>
                        <p className="text-sm text-slate-400">طريقة الدفع: {user.paymentMethod === "instapay" ? "InstaPay" : "فوري"}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          className="bg-emerald-500 hover:bg-emerald-600 text-slate-950"
                          onClick={() => handleApprove(user)}
                        >
                          <Check className="w-4 h-4 ml-2" />
                          تفعيل الاشتراك
                        </Button>
                        <Button variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10" onClick={() => handleReject(user)}>
                          <X className="w-4 h-4" />
                          رفض
                        </Button>
                      </div>
                    </div>
                    {user.photos.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-slate-400 mb-2">صور الجسم:</p>
                        <div className="flex gap-2">
                          {user.photos.map((photo, index) => (
                            <img key={index} src={photo} alt={`صورة ${index + 1}`} className="w-20 h-20 object-cover rounded-lg" />
                          ))}
                        </div>
                      </div>
                    )}
                    {user.receipt && (
                      <div className="mt-4">
                        <p className="text-sm text-slate-400 mb-2">إيصال التحويل:</p>
                        <img src={user.receipt} alt="إيصال التحويل" className="w-40 h-40 object-cover rounded-lg" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <div className="relative">
              <Search className="absolute right-3 top-3 w-4 h-4 text-slate-500" />
              <Input
                placeholder="ابحث عن عميل..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-900 border-slate-700 text-slate-100 pr-10"
              />
            </div>
            {filteredActiveUsers.length === 0 ? (
              <Card className="bg-slate-900 border-emerald-500/20">
                <CardContent className="p-8 text-center text-slate-400">
                  لا يوجد عملاء نشطون
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {filteredActiveUsers.map((user) => (
                  <Card
                    key={user.id}
                    className="bg-slate-900 border-emerald-500/20 cursor-pointer hover:border-emerald-500/50 transition-colors"
                    onClick={() => setSelectedClient(user)}
                  >
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-slate-100 mb-2">{user.fullName}</h3>
                      <p className="text-sm text-slate-400 mb-4">الهدف: {user.goal}</p>
                      <div className="flex gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <Dumbbell className="w-4 h-4 text-emerald-400" />
                          {user.workouts.length} تمرين
                        </span>
                        <span className="flex items-center gap-1">
                          <Utensils className="w-4 h-4 text-emerald-400" />
                          {user.meals.length} وجبة
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {rejectedUsers.length === 0 ? (
              <Card className="bg-slate-900 border-emerald-500/20">
                <CardContent className="p-8 text-center text-slate-400">
                  لا توجد طلبات مرفوضة
                </CardContent>
              </Card>
            ) : (
              rejectedUsers.map((user) => (
                <Card key={user.id} className="bg-slate-900 border-red-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-100">{user.fullName}</h3>
                        <p className="text-sm text-slate-400">{user.email}</p>
                      </div>
                      <Button
                        className="bg-emerald-500 hover:bg-emerald-600 text-slate-950"
                        onClick={() => handleApprove(user)}
                      >
                        إعادة تفعيل
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Builder Modal */}
        {selectedClient && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="bg-slate-900 border-emerald-500/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-slate-100">بناء برنامج {selectedClient.fullName}</CardTitle>
                <Button variant="ghost" className="text-slate-400" onClick={() => setSelectedClient(null)}>
                  <X className="w-5 h-5" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Workouts */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-emerald-400 flex items-center gap-2">
                    <Dumbbell className="w-5 h-5" />
                    التمارين الرياضية
                  </h3>
                  <div className="space-y-2">
                    {selectedClient.workouts.map((workout) => (
                      <div key={workout.id} className="p-4 rounded-lg bg-slate-800 border border-slate-700">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-slate-100">{workout.name}</h4>
                            <p className="text-sm text-slate-400">
                              {workout.sets} مجموعات × {workout.reps} تكرارات
                            </p>
                            {workout.rest && <p className="text-sm text-slate-500">راحة: {workout.rest}</p>}
                            {workout.notes && <p className="text-sm text-slate-500 mt-1">{workout.notes}</p>}
                          </div>
                          <Button
                            variant="ghost"
                            className="text-red-400 hover:bg-red-500/10"
                            onClick={() => handleDeleteWorkout(workout.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <Input
                      placeholder="اسم التمرين"
                      value={newWorkout.name}
                      onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-slate-100"
                    />
                    <div className="flex gap-3">
                      <Input
                        placeholder="مجموعات"
                        value={newWorkout.sets}
                        onChange={(e) => setNewWorkout({ ...newWorkout, sets: e.target.value })}
                        className="bg-slate-800 border-slate-700 text-slate-100"
                      />
                      <Input
                        placeholder="تكرارات"
                        value={newWorkout.reps}
                        onChange={(e) => setNewWorkout({ ...newWorkout, reps: e.target.value })}
                        className="bg-slate-800 border-slate-700 text-slate-100"
                      />
                    </div>
                    <Input
                      placeholder="فترة الراحة"
                      value={newWorkout.rest}
                      onChange={(e) => setNewWorkout({ ...newWorkout, rest: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-slate-100"
                    />
                    <Textarea
                      placeholder="ملاحظات التنفيذ"
                      value={newWorkout.notes}
                      onChange={(e) => setNewWorkout({ ...newWorkout, notes: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-slate-100 md:col-span-2"
                    />
                  </div>
                  <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950" onClick={handleAddWorkout}>
                    إضافة تمرين
                  </Button>
                </div>

                {/* Meals */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-emerald-400 flex items-center gap-2">
                    <Utensils className="w-5 h-5" />
                    النظام الغذائي
                  </h3>
                  <div className="space-y-2">
                    {selectedClient.meals.map((meal) => (
                      <div key={meal.id} className="p-4 rounded-lg bg-slate-800 border border-slate-700">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-slate-100">
                              {meal.type === "breakfast" ? "الإفطار" : meal.type === "lunch" ? "الغداء" : meal.type === "dinner" ? "العشاء" : "سناك"} - {meal.name}
                            </h4>
                            <p className="text-sm text-slate-400 mt-1">{meal.items}</p>
                            <div className="flex gap-4 text-xs text-slate-500 mt-2">
                              <span>{meal.calories} سعرة</span>
                              <span>بروتين: {meal.protein}g</span>
                              <span>كارب: {meal.carbs}g</span>
                              <span>دهون: {meal.fats}g</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            className="text-red-400 hover:bg-red-500/10"
                            onClick={() => handleDeleteMeal(meal.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <select
                      value={newMeal.type}
                      onChange={(e) => setNewMeal({ ...newMeal, type: e.target.value as Meal["type"] })}
                      className="bg-slate-800 border-slate-700 text-slate-100 rounded-md px-3 py-2"
                    >
                      <option value="breakfast">إفطار</option>
                      <option value="lunch">غداء</option>
                      <option value="dinner">عشاء</option>
                      <option value="snack">سناك</option>
                    </select>
                    <Input
                      placeholder="اسم الوجبة"
                      value={newMeal.name}
                      onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-slate-100"
                    />
                    <Textarea
                      placeholder="مكونات الوجبة"
                      value={newMeal.items}
                      onChange={(e) => setNewMeal({ ...newMeal, items: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-slate-100 md:col-span-2"
                    />
                    <div className="grid grid-cols-4 gap-2 md:col-span-2">
                      <Input
                        placeholder="سعرات"
                        value={newMeal.calories}
                        onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
                        className="bg-slate-800 border-slate-700 text-slate-100"
                      />
                      <Input
                        placeholder="بروتين"
                        value={newMeal.protein}
                        onChange={(e) => setNewMeal({ ...newMeal, protein: e.target.value })}
                        className="bg-slate-800 border-slate-700 text-slate-100"
                      />
                      <Input
                        placeholder="كارب"
                        value={newMeal.carbs}
                        onChange={(e) => setNewMeal({ ...newMeal, carbs: e.target.value })}
                        className="bg-slate-800 border-slate-700 text-slate-100"
                      />
                      <Input
                        placeholder="دهون"
                        value={newMeal.fats}
                        onChange={(e) => setNewMeal({ ...newMeal, fats: e.target.value })}
                        className="bg-slate-800 border-slate-700 text-slate-100"
                      />
                    </div>
                  </div>
                  <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950" onClick={handleAddMeal}>
                    إضافة وجبة
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}