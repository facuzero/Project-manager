import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";

export const ProtectedLayout = () => {
  const { auth, loading } = useAuth();
  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      {auth._id ? (
        <div>
          <Header />
          <div>
            <Sidebar />
            <main className='container h-screen-center mx-auto p-5 rounded-md bg-gradient-to-r from-green-400 to-sky-800  '>
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to='/' />
      )}
    </>
  );
};
