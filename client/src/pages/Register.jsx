import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../components/Alert/Alert";
import { clientAxios } from "../config/clientAxios";
import { useForm } from "../hooks/useForm";
import Swal from "sweetalert2";

const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}/;

export const Register = () => {
  const [alert, setAlert] = useState({});
  const [sending, setSending] = useState(false);

  const { formValues, handleInputChange, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(formValues);

    if ([name, email, password, password2].includes("")) {
      handleShowAlert("Todos los campos son obligatorios");
      return null;
    }

    if (!exRegEmail.test(email)) {
      handleShowAlert("El email es invalido");
      return null;
    }

    if (password !== password2) {
      handleShowAlert("Las contraseñas no coinciden");
      return null;
    }

    try {
      setSending(true);
      const { data } = await clientAxios.post("/auth/register", {
        name,
        email,
        password,
      });

      setSending(false);

      Swal.fire({
        icon: "info",
        title: "Gracias por registrarte",
        text: data.msg,
      });

      reset();
    } catch (error) {
      console.error(error);
      handleShowAlert(error.response?.data.msg);
      reset();
    }

    const handleShowAlert = (msg) => {
      setAlert({
        msg,
      });
      setTimeout(() => {
        setAlert({});
      }, 3000);
    };
  };

  return (
    <>
      <h1 className='rounded bg-gradient-to-r from-sky-500 via-cyan-500-500 to-slate-400 animate-gradient-x flex justify-center'>
        Creá tu cuenta
      </h1>

      {alert.msg && <Alert {...alert} />}

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label
            htmlFor='name'
            className='mt-2 rounded flex flex-col w-full bg-gradient-to-r from-sky-500 via-cyan-500-500 to-sky-700 animate-gradient-x items-center'
          >
            Nombre
          </label>
          <input
            type='text'
            id='name'
            placeholder='Ingrese su nombre'
            autoComplete='off'
            value={name}
            name='name'
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label
            htmlFor='email'
            className='mt-2 rounded flex flex-col w-full bg-gradient-to-r from-sky-500 via-cyan-500-500 to-sky-700 animate-gradient-x items-center'
          >
            Correo electrónico
          </label>
          <input
            type='email'
            id='email'
            placeholder='Ingrese su email'
            autoComplete='off'
            value={email}
            name='email'
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label
            htmlFor='password'
            className='mt-2 rounded flex flex-col w-full bg-gradient-to-r from-sky-500 via-cyan-500-500 to-sky-700 animate-gradient-x items-center'
          >
            Contraseña
          </label>
          <input
            type='password'
            id='password'
            placeholder='Ingrese su contraseña'
            value={password}
            name='password'
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label
            htmlFor='password'
            className='mt-2 rounded flex flex-col w-full bg-gradient-to-r from-sky-500 via-cyan-500-500 to-sky-700 animate-gradient-x items-center'
          >
            Confirmar contraseña
          </label>
          <input
            type='password'
            id='password2'
            placeholder='Confirme su contraseña'
            value={password2}
            name='password2'
            onChange={handleInputChange}
          />
        </div>

        <button
          disabled={sending}
          type='submit'
          className='mt-2 rounded flex flex-col w-full bg-gradient-to-r from-sky-500 via-cyan-500-500 to-orange-500 animate-gradient-x items-center'
        >
          Crear cuenta
        </button>
      </form>

      <nav>
        <Link
          to={"/"}
          className='mt-2 rounded flex flex-col w-full items-center'
        >
          ¿Estas registrado? Iniciá sesión
        </Link>
        <Link
          to={"/forget-password"}
          className='mt-2 rounded flex flex-col w-full items-center'
        >
          Olvidé mi contraseña
        </Link>
      </nav>
    </>
  );
};
