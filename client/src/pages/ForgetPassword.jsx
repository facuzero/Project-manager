import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Alert } from "../components/Alert/Alert";
import { clientAxios } from "../config/clientAxios";

export const ForgetPassword = () => {
  const [alert, setAlert] = useState({});
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      handleShowAlert("El email es requerido");
      return null;
    }

    const handleShowAlert = (msg) => {
      setAlert({
        msg,
      });
      setTimeout(() => {
        setAlert({});
      }, 3000);
    };

    try {
      setSending(true);
      const { data } = await clientAxios.post("/auth/send-token", {
        email,
      });
      setSending(true);
      Swal.fire({
        icon: "info",
        title: "revisa tu casilla de correo",
        text: data.msg,
        confirmButtonText: "entendido",
        allowOutsideClick: false,
      });
      setEmail("");
    } catch (error) {
      console.error(error);
      handleShowAlert(error.response?.data.msg);
      setEmail("");
    }
  };

  return (
    <>
      <h1 className='mt-2 rounded flex flex-col w-full bg-gradient-to-r from-sky-500 via-cyan-500-500 to-sky-700 animate-gradient-x items-center'>
        Recupera tu acceso
      </h1>

      {alert.msg && <Alert {...alert} />}

      <form onSubmit={handleSubmit} noValidate>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          type='submit'
          disabled={sending}
          className='mt-2 rounded flex flex-col w-full bg-gradient-to-r from-sky-500 via-cyan-500-500 to-sky-700 animate-gradient-x items-center'
        >
          Recuperar contraseña
        </button>
      </form>

      <nav>
        <Link
          to={"/register"}
          className='mt-2 rounded flex flex-col w-full items-center'
        >
          ¿No tenés cuenta? Registrate
        </Link>
        <Link
          to={"/"}
          className='mt-2 rounded flex flex-col w-full items-center'
        >
          ¿Estás registrado? Iniciá sesión
        </Link>
      </nav>
    </>
  );
};
