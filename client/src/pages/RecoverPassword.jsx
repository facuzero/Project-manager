import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Alert } from "../components/Alert/Alert";
import { clientAxios } from "../config/clientAxios";

export const RecoverPassword = () => {
  const [alert, setAlert] = useState({});
  const [password, setPassword] = useState("");
  const [tokenChecked, setTokenChecked] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();
  const handleShowAlert = (msg) => {
    setAlert({
      msg,
    });
    setTimeout(() => {
      setAlert({});
    }, 3000);
  };
  useEffect(() => {
    const checkToken = async () => {
      try {
        const { data } = await clientAxios.get(
          `/auth/reset-password?token=${token}`
        );
        setTokenChecked(true);
      } catch (error) {
        console.error(error);
        handleShowAlert(error.response?.data.msg);
      }
    };
    checkToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      handleShowAlert("El password es obligatorio");
      return null;
    }

    try {
      const { data } = await clientAxios.post(
        `/auth/reset-password?token=${token}`,
        {
          password,
        }
      );
      Swal.fire({
        icon: "info",
        title: "Password cambiado con exito",
        text: data.msg,
        confirmButtonText: "Iniciar sesión",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          setPassword("");
          navigate("/");
        }
      });
    } catch (error) {
      console.error(error);
      handleShowAlert(error.response?.data.msg);
      setPassword("");
    }
  };

  return (
    <>
      <h1 className='mt-2 rounded flex flex-col w-full bg-gradient-to-r from-sky-500 via-cyan-500-500 to-sky-700 animate-gradient-x items-center'>
        Reestablecé tu contraseña
      </h1>
      {alert.msg && <Alert {...alert} />}
      {tokenChecked ? (
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label
              htmlFor='password'
              className='mt-2 rounded flex flex-col w-full bg-gradient-to-r from-sky-500 via-cyan-500-500 to-sky-700 animate-gradient-x items-center'
            >
              Nueva contraseña
            </label>
            <input
              type='password'
              id='password'
              placeholder='Escribí tu nueva contraseña'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type='submit'
            className='rounded bg-green-500 hover:bg-gradient-to-r from-green-500 via-green-300 to-bg-green- animate-gradient-x'
          >
            Cambiar Contraseña
          </button>
        </form>
      ) : (
        <nav>
          <Link to={"/register"}>¿No tenés cuenta? Registrate</Link>
          <Link to={"/forget-password"}>Olvidé mi contraseña</Link>
        </nav>
      )}
    </>
  );
};
