import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { clientAxios } from "../config/clientAxios";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const projectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const navigate = useNavigate();

  const [alert, setAlert] = useState([]);
  const [loading, setLoading] = useState(true);

  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});

  const showAlert = (msg, time = true) => {
    setAlert({
      msg,
    });

    if (time) {
      setTimeout(() => {
        setAlert({});
      }, 3000);
    }
  };

  const getProjects = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");

      if (!token) return null;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const { data } = await clientAxios.get("api/projects", config);

      setProjects(data.projects);
    } catch (error) {
      console.log(error);
      showAlert(
        error.response ? error.response.data.msg : "Hubo un error",
        false
      );
    } finally {
      setLoading(false);
    }
  };

  const getProject = async (id) => {
    setLoading(true);

    try {
      const token = sessionStorage.getItem("token");

      if (!token) return null;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await clientAxios.get(`api/projects/${id}`, config);

      setProject(data.project);
    } catch (error) {
      console.error(error);
      showAlert(
        error.response ? error.response.data.msg : "Hubo un error",
        false
      );
    } finally {
      setLoading(false);
    }
  };

  const storeProject = async (project) => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) return null;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      if (project.id) {
        const { data } = await clientAxios.put(
          `api/projects/${project.id}`,
          project,
          config
        );
        console.log("PROJECT: " + project);
        console.log("DATA: " + data);
        const projectsUpdated = projects.map((projectState) => {
          if (projectState._id === data.project._id) {
            return data.project;
          }
          return projectState;
        });

        setProjects(projectsUpdated);

        Toast.fire({
          icon: "success",
          title: data.msg,
        });
      } else {
        const { data } = await clientAxios.post(
          `api/projects`,
          project,
          config
        );
        setProjects([...projects, data.project]);
        Toast.fire({
          icon: "success",
          title: data.msg,
        });
      }
      navigate("/projects");
    } catch (error) {
      console.log(error);
      showAlert(
        error.response ? error.response.data.msg : "Hubo un error",
        false
      );
    }
  };

  const deleteProject = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return null;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await clientAxios.delete(`api/projects/${id}`, config);

      const projectsFiltered = projects.filter((project) => project._id !== id);

      setProjects(projectsFiltered);

      Toast.fire({
        icon: "success",
        title: data.msg,
      });

      navigate("projects");
    } catch (error) {
      console.error(error);
      showAlert(
        error.response ? error.response.data.msg : "Upss, hubo un error",
        false
      );
    }
  };

  return (
    <projectsContext.Provider
      value={{
        loading,
        alert,
        showAlert,
        projects,
        getProjects,
        project,
        getProject,
        storeProject,
        deleteProject,
      }}
    >
      {children}
    </projectsContext.Provider>
  );
};

export default projectsContext;
