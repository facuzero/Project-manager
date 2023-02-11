import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { useProjects } from "../hooks/useProjects";
import { Alert } from "./Alert/Alert";

export const FormProject = () => {
  const { alert, showAlert, storeProject, project } = useProjects();
  const { id } = useParams();

  const inputName = useRef(null);
  const inputDescription = useRef(null);
  const inputDateExpire = useRef(null);
  const inputClient = useRef(null);

  const { loading, formValues, handleInputChange, reset, setformValues } =
    useForm({
      name: "",
      description: "",
      dateExpire: "",
      client: "",
    });

  let { name, description, dateExpire, client } = formValues;

  useEffect(() => {
    if (id) {
      const { name, description, dateExpire, client } = project;
      inputName.current.value = name;
      inputDescription.current.value = description;
      inputDateExpire.current.value = dateExpire; //dateExpire.split("T")[0];
      inputClient.current.value = client;

      setformValues({
        name: name,
        description: description,
        dateExpire: dateExpire.split("T")[0],
        client: client,
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([name, description, dateExpire, client].includes("")) {
      showAlert("Todos los campos son obligatorios");
      return null;
    }
    storeProject({
      id: id ? id : null,
      name,
      description,
      dateExpire,
      client,
    });
  };

  return (
    <form
      className='bg-white py-5 px-5  rounded-md border-2 flex flex-col'
      onSubmit={handleSubmit}
    >
      {alert.msg && <Alert {...alert} />}

      <div className='mb-5 justify-around'>
        <label htmlFor='name'>Nombre Proyecto</label>
        <input
          className='text-end'
          type='text'
          id='name'
          placeholder='Nombre del proyecto'
          value={name}
          onChange={handleInputChange}
          name='name'
          ref={inputName}
        />
      </div>
      <div className='mb-5 justify-around'>
        <label htmlFor='description' className='relative -top-6'>
          Descripcion del Proyecto
        </label>
        <textarea
          className='text-end -ml-1'
          id='description'
          type='text'
          style={{ resize: "none" }}
          placeholder='Descripcion del proyecto'
          value={description}
          onChange={handleInputChange}
          name='description'
          ref={inputDescription}
        />
      </div>
      <div className='mb-5'>
        <label htmlFor='date-expire'>Fecha de entrega</label>
        <input
          className='ml-32'
          type='date'
          id='date-expire'
          value={dateExpire}
          onChange={handleInputChange}
          name='dateExpire'
          ref={inputDateExpire}
        />
      </div>
      <div className='justify-around'>
        <label htmlFor='client'>Nombre del cliente</label>
        <input
          className='text-center ml-5'
          type='text'
          id='client'
          placeholder='Nombre del cliente'
          value={client}
          onChange={handleInputChange}
          name='client'
          ref={inputClient}
        />
      </div>
      <button
        className={`${
          false ? "bg-green-600" : "bg-green-500"
        } w-full p-3 uppercase font-bold text-white rounded-lg ${
          false ? "hover:bg-green-500" : "hover:bg-emerald-600"
        }  transition-colors`}
      >
        {id ? "actualizar cambios" : "guardar proyecto"}
      </button>
    </form>
  );
};
