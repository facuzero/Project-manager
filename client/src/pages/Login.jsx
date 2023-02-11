import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert/Alert";
import { clientAxios } from "../config/clientAxios";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";

export const Login = () => {
  const [alert, setAlert] = useState({});
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleShowAlert = (msg, time = true) => {
    setAlert({
      msg,
    });

    if (time) {
      setTimeout(() => {
        setAlert({});
      }, 3000);
    }
    reset();
  };

  const { formValues, handleInputChange, reset } = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      handleShowAlert("Los campos son obligatorios");
      return null;
    }

    try {
      const { data } = await clientAxios.post("api/auth/login", {
        email,
        password,
      });

      setAuth(data.user);

      sessionStorage.setItem("token", data.token);

      navigate("/projects");
    } catch (error) {
      console.error(error);
      handleShowAlert(error.response?.data.msg);
    }
  };

  return (
    <>
      <h1 className='rounded bg-gradient-to-r from-sky-500 via-cyan-500-500 to-slate-400 animate-gradient-x flex justify-center'>
        Iniciá sesión
      </h1>

      {alert.msg && <Alert {...alert} />}

      <form onSubmit={handleSubmit}>
        <div className='mt-2 rounded flex flex-col w-full bg-gradient-to-r from-sky-500 via-cyan-500-500 to-sky-700 animate-gradient-x'>
          <label htmlFor='email' className='flex justify-center'>
            Correo electrónico
          </label>
          <input
            type='email'
            id='email'
            placeholder='Ingrese su email'
            className='rounded'
            name='email'
            value={email}
            onChange={handleInputChange}
          />
        </div>

        <div className='mt-2 rounded flex flex-col w-full bg-gradient-to-r from-sky-500 via-cyan-500-500 to-sky-700 animate-gradient-x'>
          <label htmlFor='password' className='flex justify-center'>
            Contraseña
          </label>
          <input
            type='password'
            id='password'
            placeholder='Ingrese su contraseña'
            className='rounded'
            name='password'
            value={password}
            onChange={handleInputChange}
          />
        </div>

        <div className='text-center mt-4 mb-4'>
          <button
            type='submit'
            className='rounded bg-green-500 hover:bg-gradient-to-r from-green-500 via-green-300 to-bg-green- animate-gradient-x'
          >
            Iniciar sesión
          </button>
        </div>
      </form>

      <nav className='flex flex-col'>
        <div className='flex'>
          <p>¿No tenés cuenta?</p>
          <Link to={"/register"} className='bg-blue-500 rounded-md ml-3'>
            Registrate
          </Link>
        </div>
        <Link
          to={"/forget-password"}
          className='w-44 bg-blue-500 rounded mt-3 ml-40 '
        >
          Olvidé mi contraseña
        </Link>
      </nav>
    </>
  );
};
