import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { setAuthToken, getAuthToken } from "../features/auth/auth-storage";
import { useEffect } from "react";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (getAuthToken()) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    if (!values.email || !values.password) {
      return;
    }

    setAuthToken("dummy-token");

    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-700 border border-slate-800 p-6 rounded-xl shadow-xl w-full mx-auto max-w-md text-slate-100">
        <p className="text-2xl font-bold mb-6 text-center">Login</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <label
              htmlFor="email"
              className=" text-sm font-medium text-slate-200 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm focus:outline-none"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className=" text-sm font-medium text-slate-200 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm focus:outline-none "
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters",
                },
              })}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full mt-2 rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-950"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
