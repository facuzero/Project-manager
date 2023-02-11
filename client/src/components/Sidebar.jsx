import { Link } from "react-router-dom";

const user = "Usuario desconocido";

export const Sidebar = () => {
  return (
    <aside className='md:w-80 px-5 py-10'>
      <p>Hola : {user}</p>
      <Link to='create-project' className='bg-cyan-800 rounded-md text-cyan-50'>
        Nuevo proyecto
      </Link>
    </aside>
  );
};
