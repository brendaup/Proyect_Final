import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/auth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const {
    signin,
    user,
    errors: loginErrors,
    setIsAuthenticated,
    setUserName,
  } = useAuth();

  useEffect(() => {
    signin();
  }, []);

  const navigate = useNavigate();

  const onSubmit = (formData) => {
    const isMatch = user.filter(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );
    
    if (isMatch.length === 1) {
      setUserName(isMatch[0]);
      setIsAuthenticated(true);
      navigate("/");
    } else {
      navigate("/login");
      alert("Asegúrate de escribir correctamente tu email y usuario.");
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {loginErrors.map((error, i) => (
          <p
            className="text-slate-200 bg-red-500 py-2 px-3 text-sm rounded-sm mb-1"
            key={i}
          >
            {error}
          </p>
        ))}
        <h1 className="text-2xl text-white font-bold">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email" className="text-m block my-3 text-slate-300">
            Email:
          </label>
          <input
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            label="Write your email"
            type="email"
            id="email"
            placeholder="youremail@domain.tld"
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}

          <label htmlFor="email" className="text-m block my-3 text-slate-300">
            Password:
          </label>
          <input
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            type="password"
            id="password"
            placeholder="Write your password"
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}

          <button
            type="onSubmit"
            className="bg-blue-300 px-4 py-1 rounded-md my-5 disabled:bg-indigo-300"
          >
            Login
          </button>
        </form>

        <p className="flex gap-x-2 justify-between text-white">
          Don't have an account?
          <button className="bg-blue-300 px-4 py-1 rounded-md my-5 disabled:bg-indigo-300">
            <Link className="no-underline text-slate-800" to="/register">
              Register
            </Link>
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
