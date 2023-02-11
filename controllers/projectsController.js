const createHttpError = require("http-errors");
const Project = require("../database/models/Proyect");
const errorResponse = require("../helpers/errorResponse");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  list: async (req, res) => {
    try {
      const projects = await Project.find()
        .where("createBy")
        .equals(req.user)
        .select("name client");

      return res.status(200).json({
        ok: true,
        msg: "Lista de proyectos",
        projects,
      });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error, "LOGIN");
    }
  },
  store: async (req, res) => {
    try {
      const { name, description, client } = req.body;
      if (
        [name, description, client].includes("") ||
        !name ||
        !description ||
        !client
      )
        throw createError(400, "todos los campos son obligatorios");

      if (!req.user) throw createError(400, "Error de autenticacion");

      const project = new Project(req.body);
      project.createBy = req.user._id;
      //console.log(project)
      const projectStore = await project.save();

      return res.status(200).json({
        ok: true,
        msg: "Proyect guardado",
        project: projectStore,
      });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error, "STORE");
    }
  },
  detail: async (req, res) => {
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) {
        throw createError(404, "no es un id valido");
      }

      const project = await Project.findById(id);

      if (!project) throw createHttpError(404, "Proyecto no encontrado");

      if (req.user._id.toString() !== project.createBy.toString())
        throw createHttpError(401, "Erro de autorizacion");

      return res.status(200).json({
        ok: true,
        msg: "Detalle del proyecto",
        project,
      });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error, "PROJECT-DETAIL");
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) throw createError(400, "ID invalido");

      const project = await Project.findById(id);
      if (!project) throw createError(400, "Proyecto no encontrado");

      if (req.user._id.toString() !== project.createBy.toString())
        throw createError(401, "No estás autorizado/a");

      const { name, description, client, dateExpire } = req.body;

      project.name = name || project.name;
      project.description = description || project.description;
      project.client = client || project.client;
      project.dateExpire = dateExpire || project.dateExpire;

      const projectUpdated = await project.save();
      return res.status(201).json({
        ok: true,
        msg: "Proyecto actualizado",
        project: projectUpdated,
      });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error, "UPDATE");
    }
  },
  remove: async (req, res) => {
    try {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) throw createError(400, "ID inválido");

      const project = await Project.findById(id);

      if (!project) throw createError(404, "Proyecto no encontrado");

      if (req.user._id.toString() !== project.createBy.toString())
        throw createError(401, "No estás autorizado/a");

      await project.deleteOne();

      return res.status(200).json({
        ok: true,
        msg: "Proyecto eliminado",
      });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error, "REMOVE");
    }
  },
  addCollaborator: async (req, res) => {
    try {
      return res.status(200).json({
        ok: true,
        msg: "Colaborador agregado con exito",
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "ups, hubo un error en ADD-COLLABORATOR",
      });
    }
  },
  removeCollaborator: async (req, res) => {
    try {
      return res.status(200).json({
        ok: true,
        msg: "Colaborador eliminado con exito",
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "ups, hubo un error en REMOVE-COLLABORATOR",
      });
    }
  },
};
