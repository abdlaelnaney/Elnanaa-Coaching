import { useState, useEffect } from "react";
import { LandingPage } from "@/components/LandingPage";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { AdminDashboard } from "@/components/AdminDashboard";
import { ClientDashboard } from "@/components/ClientDashboard";
import { Toaster } from "@/components/ui/sonner";

export type Page = "landing" | "onboarding" | "admin" | "client";

export interface User {
  id: string;
  fullName: string;
  age: string;
  height: string;
  weight: string;
  phone: string;
  email: string;
  goal: string;
  fitnessLevel: string;
  photos: string[];
  plan: "monthly" | "quarterly";
  status: "pending" | "active" | "rejected";
  paymentMethod?: "instapay" | "fawry";
  receipt?: string;
  workouts: Workout[];
  meals: Meal[];
  weightLogs: { date: string; weight: number }[];
  joinedDate: string;
}

export interface Workout {
  id: string;
  name: string;
  sets: string;
  reps: string;
  rest: string;
  notes: string;
  completed: boolean;
}

export interface Meal {
  id: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  name: string;
  items: string;
  calories: string;
  protein: string;
  carbs: string;
  fats: string;
}

interface AppState {
  users: User[];
  currentUser: User | null;
  currentPage: Page;
}

const initialState: AppState = {
  users: [],
  currentUser: null,
  currentPage: "landing",
};

export default function App() {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem("elnanaa_state");
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("elnanaa_state", JSON.stringify(state));
  }, [state]);

  const navigate = (page: Page) => {
    setState((prev) => ({ ...prev, currentPage: page }));
  };

  const addUser = (user: User) => {
    setState((prev) => ({
      ...prev,
      users: [...prev.users, user],
      currentUser: user,
    }));
  };

  const updateUser = (updatedUser: User) => {
    setState((prev) => ({
      ...prev,
      users: prev.users.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
      currentUser: prev.currentUser?.id === updatedUser.id ? updatedUser : prev.currentUser,
    }));
  };

  const loginAsClient = (email: string) => {
    const user = state.users.find((u) => u.email === email && u.status === "active");
    if (user) {
      setState((prev) => ({ ...prev, currentUser: user, currentPage: "client" }));
      return true;
    }
    return false;
  };

  const loginAsAdmin = () => {
    setState((prev) => ({ ...prev, currentPage: "admin" }));
  };

  const logout = () => {
    setState((prev) => ({ ...prev, currentUser: null, currentPage: "landing" }));
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 text-slate-100">
      {state.currentPage === "landing" && (
        <LandingPage
          onSubscribe={(plan) => {
            setState((prev) => ({
              ...prev,
              currentUser: {
                ...prev.currentUser!,
                plan,
              } as User,
              currentPage: "onboarding",
            }));
          }}
          onAdminLogin={loginAsAdmin}
          onClientLogin={loginAsClient}
        />
      )}
      {state.currentPage === "onboarding" && (
        <OnboardingFlow
          plan={state.currentUser?.plan || "monthly"}
          onComplete={addUser}
          onBack={() => navigate("landing")}
        />
      )}
      {state.currentPage === "admin" && (
        <AdminDashboard
          users={state.users}
          onUpdateUser={updateUser}
          onBack={() => navigate("landing")}
        />
      )}
      {state.currentPage === "client" && state.currentUser && (
        <ClientDashboard
          user={state.currentUser}
          onUpdateUser={updateUser}
          onLogout={logout}
        />
      )}
      <Toaster position="top-center" richColors />
    </div>
  );
}