import { useState } from "react";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <main className='container h-screen items-center mx-auto p-5 rounded-md bg-gradient-to-r from-green-400 to-sky-800  relative'>
        <nav className='absolute top-0 right-0'>
          <h4 className='sm:w-32 mt-2 rounded flex flex-col w-full bg-gradient-to-r from-sky-500 via-cyan-500-500 to-sky-700 animate-gradient-x items-center mr-9'>
            <button onClick={() => setShow(!show)}>Temas</button>
          </h4>
          <div className='absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg'>
            <div className='bg-white rounded-md shadow-xs'>
              {show && (
                <div className='py-1 flex-col '>
                  <div className='flex justify-center'>
                    <p>Dark</p>
                    <button className='px-4 py-2 text-sm h-9 leading-5 text-gray-700 hover:bg-gray-300 focus:outline-none focus:bg-gray-100 transition duration-150'>
                      <svg viewBox='0 0' className='w-10 h-20 relative top-0'>
                        <path
                          d='M21.4,13.7C20.6,13.9,19.8,14,19,14c-5,0-9-4-9-9c0-0.8,0.1-1.6,0.3-2.3c0.1-0.3,0-0.7-0.3-1c-0.3-0.3-0.6-0.4-1-0.3
                        C4.3,2.7,1,7.1,1,12c0,6.1,4.9,11,11,11c4.9,0,9.3-3.3,10.6-8c0.1-0.3,0-0.7-0.3-1C22,13.1,21.7,13.5,21.4,13.7z'
                        />
                      </svg>
                    </button>
                  </div>
                  <hr />
                  {/* <button className='flex justify-evenly px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-300 focus:outline-none focus:bg-gray-100 transition duration-150'>
                    Default
                  </button> */}
                  <button className='flex-col justify-evenly px-4 py-2 text-sm h-9 leading-5 text-gray-700 focus:outline-none focus:bg-gray-100 transition-all duration-300 ease-in-out hover:origin-top-right hover:bg-gradient-to-r from-blue-500 via-purple-600 to-red-400 brightness-100'>
                    <p>Special</p>
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
        <div className='shadow-2xl shadow-black rounded-lg'>
          <Outlet />
        </div>
      </main>
    </>
  );
};
