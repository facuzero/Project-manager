module.exports = {
  list: async (req, res) => {
    try {
      return res.status(200).json({
        ok: true,
        msg: "Lista de tareas",
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "ups, hubo un error en la LISTA DE TAREAS",
      });
    }
  },
  store: async (req, res) => {
    try {
      return res.status(200).json({
        ok: true,
        msg: "Tarea guardada",
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "ups, hubo un error en STORE-TASK",
      });
    }
  },
  detail: async (req, res) => {
    try {
      return res.status(201).json({
        ok: true,
        msg: "Detalle de la tareao",
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "ups, hubo un error en TASK DETAIL",
      });
    }
  },
  update: async (req, res) => {
    try {
      return res.status(201).json({
        ok: true,
        msg: "Tarea actualizada",
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "ups, hubo un error en UPDATE-TASK",
      });
    }
  },
  remove: async (req, res) => {
    try {
      return res.status(200).json({
        ok: true,
        msg: "Tarea eliminada",
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "ups, hubo un error en REMOVE-TASK",
      });
    }
  },

  changeState: async (req, res) => {
    try {
      return res.status(200).json({
        ok: true,
        msg: "Tarea completada",
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "ups, hubo un error en CHANGE-STATE",
      });
    }
  },
};
