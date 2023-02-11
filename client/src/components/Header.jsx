import { Link } from "react-router-dom";

const closeSession = () => {
  console.log("TODO cerrar sesion");
};

export const Header = () => {
  return (
    <div>
      <div className='flex justify-around bg-gradient-to-r from-white to-slate-200 duration-150 animate-gradient-x'>
        <h2 className='text-sky-600 font-black text-3x1 capitalize text-2xl'>
          Projects Manager
        </h2>
        <input type='text' placeholder='Buscar proyecto...' />
        <div>
          <Link to='/projects'>Proyectos</Link>
          <button
            type='button'
            onClick={closeSession}
            className='bg-sky-600 rounded-md text-cyan-50'
          >
            Cerrar sesion
          </button>
        </div>
      </div>
    </div>
  );
};
