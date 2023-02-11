import { useContext } from "react";
import projectsContext from "../context/ProjectsProvider";

export const useProjects = () => {
  return useContext(projectsContext);
};
