import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { clientAxios } from "../config/clientAxios";
import { Alert } from "../components/Alert/Alert";
import Swal from "sweetalert2";

export const ConfirmAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [alert, setAlert] = useState({});
  const handleShowAlert = (msg) => {
    setAlert({
      msg,
    });
  };

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const { data } = await clientAxios.get(`/auth/checked?token=${token}`);

        Swal.fire({
          icon: "info",
          title: "Cuenta confirmada con exito",
          text: data.msg,
          confirmButtonText: "Iniciar sesión",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      } catch (error) {
        handleShowAlert(error.response?.data.msg);
      }
    };
    confirmAccount();
  }, []);

  return (
    <>
      <h1 className='text-sky-600 font-black text-3x1 capitalize'>
        Confirma tu cuenta
      </h1>
      {alert.msg && (
        <>
          <Alert {...alert} />
          <nav>
            <Link to={"/"}>¿Estas registrado? Inicia sesion</Link>
            <Link to={"/register"}>¿No estas registrado? Registrate</Link>
          </nav>
        </>
      )}
    </>
  );
};
