import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dumbbell, Utensils, TrendingUp, LogOut, Plus, Check, MessageCircle, Flame, Beef, Wheat, Droplet } from "lucide-react";
import { toast } from "sonner";
import type { User } from "@/App";

interface ClientDashboardProps {
  user: User;
  onUpdateUser: (user: User) => void;
  onLogout: () => void;
}

export function ClientDashboard({ user, onUpdateUser, onLogout }: ClientDashboardProps) {
  const [newWeight, setNewWeight] = useState("");

  const handleAddWeight = () => {
    if (!newWeight) return;
    const weight = parseFloat(newWeight);
    const updated = {
      ...user,
      weightLogs: [
        ...user.weightLogs,
        { date: new Date().toISOString(), weight },
      ],
    };
    onUpdateUser(updated);
    setNewWeight("");
    toast.success("تم تسجيل الوزن بنجاح");
  };

  const handleToggleWorkout = (workoutId: string) => {
    const updated = {
      ...user,
      workouts: user.workouts.map(w =>
        w.id === workoutId ? { ...w, completed: !w.completed } : w
      ),
    };
    onUpdateUser(updated);
  };

  const mealTypes = {
    breakfast: "الإفطار",
    lunch: "الغداء",
    dinner: "العشاء",
    snack: "سناك",
  };

  const totalCalories = user.meals.reduce((sum, meal) => sum + (parseInt(meal.calories) || 0), 0);
  const totalProtein = user.meals.reduce((sum, meal) => sum + (parseInt(meal.protein) || 0), 0);
  const totalCarbs = user.meals.reduce((sum, meal) => sum + (parseInt(meal.carbs) || 0), 0);
  const totalFats = user.meals.reduce((sum, meal) => sum + (parseInt(meal.fats) || 0), 0);

  const initialWeight = user.weightLogs[0]?.weight || 0;
  const currentWeight = user.weightLogs[user.weightLogs.length - 1]?.weight || 0;
  const weightChange = currentWeight - initialWeight;

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">أهلاً، {user.fullName} 👋</h1>
            <p className="text-slate-400 mt-2">الهدف: {user.goal}</p>
          </div>
          <Button variant="outline" className="border-slate-700 text-slate-400 hover:text-red-400" onClick={onLogout}>
            <LogOut className="w-4 h-4 ml-2" />
            تسجيل خروج
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-900 border-emerald-500/20">
            <CardContent className="p-4">
              <p className="text-sm text-slate-400">الوزن الحالي</p>
              <p className="text-2xl font-bold text-emerald-400">{currentWeight} كجم</p>
              {weightChange !== 0 && (
                <p className={`text-xs mt-1 ${weightChange < 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {weightChange < 0 ? "▼" : "▲"} {Math.abs(weightChange)} كجم
                </p>
              )}
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-emerald-500/20">
            <CardContent className="p-4">
              <p className="text-sm text-slate-400">الطول</p>
              <p className="text-2xl font-bold text-slate-100">{user.height} سم</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-emerald-500/20">
            <CardContent className="p-4">
              <p className="text-sm text-slate-400">التمارين المكتملة</p>
              <p className="text-2xl font-bold text-slate-100">
                {user.workouts.filter(w => w.completed).length}/{user.workouts.length}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-emerald-500/20">
            <CardContent className="p-4">
              <p className="text-sm text-slate-400">السعرات اليومية</p>
              <p className="text-2xl font-bold text-slate-100">{totalCalories}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="workouts" className="space-y-6">
          <TabsList className="bg-slate-900 border border-emerald-500/20">
            <TabsTrigger value="workouts" className="text-slate-300 data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950">
              <Dumbbell className="w-4 h-4 ml-2" />
              تماريني
            </TabsTrigger>
            <TabsTrigger value="meals" className="text-slate-300 data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950">
              <Utensils className="w-4 h-4 ml-2" />
              وجباتي
            </TabsTrigger>
            <TabsTrigger value="progress" className="text-slate-300 data-[state=active]:bg-emerald-500 data-[state=active]:text-slate-950">
              <TrendingUp className="w-4 h-4 ml-2" />
              متابعة التقدم
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workouts">
            <Card className="bg-slate-900 border-emerald-500/20">
              <CardHeader>
                <CardTitle className="text-slate-100">جدول التمارين</CardTitle>
              </CardHeader>
              <CardContent>
                {user.workouts.length === 0 ? (
                  <p className="text-slate-400 text-center py-8">
                    لم يتم إضافة تمارين بعد. سيتم إضافتها قريباً من قبل المدرب.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {user.workouts.map((workout, index) => (
                      <div
                        key={workout.id}
                        className={`p-4 rounded-lg border transition-all ${
                          workout.completed
                            ? "bg-emerald-500/10 border-emerald-500/30"
                            : "bg-slate-800 border-slate-700"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => handleToggleWorkout(workout.id)}
                              className={`mt-1 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                                workout.completed
                                  ? "bg-emerald-500 border-emerald-500"
                                  : "border-slate-500 hover:border-emerald-500"
                              }`}
                            >
                              {workout.completed && <Check className="w-4 h-4 text-slate-950" />}
                            </button>
                            <div>
                              <h4 className={`font-semibold ${workout.completed ? "text-emerald-400" : "text-slate-100"}`}>
                                {index + 1}. {workout.name}
                              </h4>
                              <p className="text-sm text-slate-400 mt-1">
                                {workout.sets} مجموعات × {workout.reps} تكرارات
                              </p>
                              {workout.rest && (
                                <p className="text-sm text-slate-500">راحة: {workout.rest}</p>
                              )}
                              {workout.notes && (
                                <p className="text-sm text-slate-400 mt-2">{workout.notes}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="meals">
            <div className="space-y-6">
              {/* Macros Overview */}
              <Card className="bg-slate-900 border-emerald-500/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-100 mb-4">إجمالي الماكروز اليومي</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-lg bg-slate-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Flame className="w-4 h-4 text-orange-400" />
                        <span className="text-sm text-slate-400">سعرات</span>
                      </div>
                      <p className="text-xl font-bold text-slate-100">{totalCalories}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Beef className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-slate-400">بروتين</span>
                      </div>
                      <p className="text-xl font-bold text-slate-100">{totalProtein}g</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Wheat className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-slate-400">كارب</span>
                      </div>
                      <p className="text-xl font-bold text-slate-100">{totalCarbs}g</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Droplet className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-slate-400">دهون</span>
                      </div>
                      <p className="text-xl font-bold text-slate-100">{totalFats}g</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Meals by Type */}
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(mealTypes).map(([type, label]) => {
                  const meals = user.meals.filter(m => m.type === type);
                  return (
                    <Card key={type} className="bg-slate-900 border-emerald-500/20">
                      <CardHeader>
                        <CardTitle className="text-slate-100">{label}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {meals.length === 0 ? (
                          <p className="text-slate-500 text-sm">لم يتم تحديد وجبات بعد</p>
                        ) : (
                          <div className="space-y-3">
                            {meals.map((meal) => (
                              <div key={meal.id} className="p-3 rounded-lg bg-slate-800">
                                <h4 className="font-semibold text-slate-100">{meal.name}</h4>
                                <p className="text-sm text-slate-400 mt-1">{meal.items}</p>
                                <div className="flex gap-3 text-xs text-slate-500 mt-2">
                                  <span>{meal.calories} سعرة</span>
                                  <span>بروتين: {meal.protein}g</span>
                                  <span>كارب: {meal.carbs}g</span>
                                  <span>دهون: {meal.fats}g</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-900 border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="text-slate-100">تسجيل الوزن</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">الوزن الجديد (كجم)</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={newWeight}
                        onChange={(e) => setNewWeight(e.target.value)}
                        className="bg-slate-800 border-slate-700 text-slate-100"
                        placeholder="أدخل وزنك"
                      />
                      <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950" onClick={handleAddWeight}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800">
                    <p className="text-sm text-slate-400 mb-2">ملخص التقدم</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-slate-500">الوزن البداية</p>
                        <p className="text-lg font-bold text-slate-100">{initialWeight} كجم</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">الوزن الحالي</p>
                        <p className="text-lg font-bold text-emerald-400">{currentWeight} كجم</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">التغير</p>
                        <p className={`text-lg font-bold ${weightChange <= 0 ? "text-emerald-400" : "text-red-400"}`}>
                          {weightChange > 0 ? "+" : ""}{weightChange} كجم
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="text-slate-100">سجل التقدم</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[...user.weightLogs].reverse().map((log, index) => (
                      <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-slate-800">
                        <span className="text-slate-300">
                          {new Date(log.date).toLocaleDateString("ar-EG")}
                        </span>
                        <span className="font-semibold text-emerald-400">{log.weight} كجم</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/201009611266"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-all hover:scale-110"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}