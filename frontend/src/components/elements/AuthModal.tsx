import { useState, useEffect } from "react"; // Add useEffect
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

// Login Schema
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

// Register Schema
const registerSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().optional(),
  role: z.enum(["JOBSEEKER", "EMPLOYER"]).default("JOBSEEKER"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false); // New state for mount animation

  // Handle mount/unmount animations
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Delay unmount for animation
      const timer = setTimeout(() => {
        setMounted(false);
      }, 300);
      // Re-enable body scroll
      document.body.style.overflow = "unset";
      
      return () => clearTimeout(timer);
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Login Form
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Register Form
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      role: "JOBSEEKER",
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Login failed");
      }

      localStorage.setItem("token", json.token);
      toast.success("Login successful!");
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      const dataToSend = {
        ...data,
        role: data.role || "JOBSEEKER",
      };
      
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || json.message || "Registration failed");
      }

      toast.success("Registered successfully! Please login.");
      setActiveTab("login");
      registerForm.reset();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Don't render anything if not mounted
  if (!mounted && !isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center px-4 transition-all duration-300 ${
        isOpen 
          ? "bg-black/85 opacity-100 pointer-events-auto" 
          : "bg-black/0 opacity-0 pointer-events-none"
      }`}
      onClick={(e) => {
        // Close modal when clicking outside
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className={`relative w-full max-w-md rounded-lg bg-white dark:bg-gray-900 shadow-2xl transform transition-all duration-300 ${
          isOpen 
            ? "translate-y-0 scale-100 opacity-100" 
            : "translate-y-8 scale-95 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">
            {activeTab === "login" ? "Welcome Back" : "Create Account"}
          </h2>

          {/* Tabs */}
          <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2 text-center font-medium transition-colors ${
                activeTab === "login"
                  ? "text-primary border-b-2 border-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-2 text-center font-medium transition-colors ${
                activeTab === "register"
                  ? "text-primary border-b-2 border-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Register
            </button>
          </div>

          {/* Login Form */}
          {activeTab === "login" && (
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
              <div>
                <input
                  {...loginForm.register("email")}
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-300 bg-white dark:bg-gray-800 transition-all duration-200"
                />
                {loginForm.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {loginForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  {...loginForm.register("password")}
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-300 bg-white dark:bg-gray-800 transition-all duration-200"
                />
                {loginForm.formState.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 dark:bg-blue-800 rounded-full text-white hover:bg-blue-700 dark:hover:bg-blue-900 disabled:opacity-70 transition-all duration-200 font-medium"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </form>
          )}

          {/* Register Form */}
          {activeTab === "register" && (
            <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
              <div>
                <input
                  {...registerForm.register("email")}
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-300 bg-white dark:bg-gray-800 transition-all duration-200"
                />
                {registerForm.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {registerForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  {...registerForm.register("password")}
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-300 bg-white dark:bg-gray-800 transition-all duration-200"
                />
                {registerForm.formState.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {registerForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  {...registerForm.register("name")}
                  type="text"
                  placeholder="Name (optional)"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-300 bg-white dark:bg-gray-800 transition-all duration-200"
                />
              </div>

              <div>
                <select
                  {...registerForm.register("role")}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-300 bg-white dark:bg-gray-800 transition-all duration-200"
                >
                  <option value="JOBSEEKER">Job Seeker</option>
                  <option value="EMPLOYER">Employer</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-700 dark:bg-blue-800 text-white rounded-full hover:bg-blue-800 dark:hover:bg-blue-900 disabled:opacity-70 transition-all duration-200 font-medium"
              >
                {loading ? "Loading..." : "Register"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};