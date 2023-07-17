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

  const { signup, errors: registerErrors, signin, user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    signin();
  }, []);

  const onSubmit = async (formData) => {
    console.log(formData);
    const isMatch = user.filter((user) => user.email === formData.email);
    console.log(isMatch);
    if (isMatch.length === 1) {
      alert(
        "El email ya se encuentra registrado. Si ya tienes una cuenta, puedes hacer login"
      );
    } else {
      await signup(formData);
      navigate("/home");
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

        <h1 className="text-3xl font-bold text-white py-4">Registro</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="username"
            className="text-m block my-3 text-slate-300"
          >
            Nombre de usuario:
          </label>
          <input
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            type="text"
            id="username"
            placeholder="Escribe tu nombre"
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
            placeholder="nombre@dominio.final"
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}

          <label htmlFor="email" className="text-m block my-3 text-slate-300">
            Contraseña:
          </label>
          <input
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            type="password"
            id="password"
            placeholder="contraseña"
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}

          <button
            type="onSubmit"
            className="bg-indigo-500 px-4 py-1 rounded-md my-5 disabled:bg-indigo-300"
          >
            Registrarme!
          </button>
        </form>
        <p>
          ¿Ya tienes una cuenta de usuario?
          <Link to="/login" className="bg-indigo-500 px-4 py-2 rounded-md mx-3">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;