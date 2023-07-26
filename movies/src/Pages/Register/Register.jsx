import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { registerSchema } from "../../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const {
    signup,
    errors: registerErrors,
    signin,
    user,
    setIsAuthenticated,
  } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    signin();
  }, []);

  const onSubmit = async (formData) => {
  
    const isMatch = user.filter((user) => user.email === formData.email);
   
    if (isMatch.length === 1) {
      alert(
        "The email is already registered. If you already have an account, you can login"
      );
    } else {
      await signup(formData);
      setIsAuthenticated(false);
      navigate("/login");
      
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        {registerErrors.map((error, i) => (
          <p className="bg-red-500 p-2 text-white" key={i}>
            {error}
          </p>
        ))}

        <h1 className="text-3xl font-bold text-white py-4">Register</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="username"
            className="text-m block my-3 text-slate-300"
          >
            Username:
          </label>
          <input
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            type="text"
            id="username"
            placeholder="Write your username"
            {...register("username")}
            autoFocus
          />
          {errors.username?.message && (
            <p className="text-red-500">{errors.username?.message}</p>
          )}

          <label htmlFor="email" className="text-m block my-3 text-slate-300">
            Email:
          </label>
          <input
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
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
            Register !
          </button>
        </form>
        <p className="flex gap-x-2 justify-between text-white">
          Already have an account?
          <button className="bg-blue-300 px-4 py-1 rounded-md my-5 disabled:bg-indigo-300">
            <Link className="no-underline text-slate-800" to="/login">
              Login
            </Link>
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
