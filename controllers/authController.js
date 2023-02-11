const createError = require("http-errors");
const errorResponse = require("../helpers/errorResponse");
const User = require("../database/models/User");
const generateTokenRandom = require("../helpers/generateTokenRandom");
const generateJWT = require("../helpers/generateJWT");
const { confirmRegister, forgotPassword } = require("../helpers/sendMails");

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if ([name, email, password].includes("")) {
        throw Error(400, "Todos los campos son obligatorios");
      }

      let user = await User.findOne({
        email,
      });
      if (user) {
        throw createError(400, " el email ya se encuentra registrado  ");
      }

      const token = generateTokenRandom();

      user = new User(req.body);
      user.token = token;

      const userStore = await user.save();

      /* TODO: Enviar el email de confirmacion con el TOKEN*/
      await confirmRegister({
        name: userStore.name,
        email: userStore.email,
        token: userStore.token,
      });

      return res.status(201).json({
        ok: true,
        msg: "Se ha enviado un email para confirmar la cuenta",
        user: userStore,
      });
    } catch (error) {
      return errorResponse(res, error, "REGISTER");
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      if ([email, password].includes("")) {
        throw createError(400, "Todos los campos son obligatorios");
      }
      let user = await User.findOne({
        email,
      });
      if (!user) {
        throw createError(403, " Credenciales invalidas");
      }
      if (!user.checked) {
        throw createError(401, "Tu cuenta no ha sido confirmada");
      }

      if (!(await user.checkedPassword(password))) {
        throw createError(403, "Credenciales invalidas");
      }

      return res.status(200).json({
        ok: true,
        msg: "usuario Logueado",
        user: {
          nombre: user.name,
          _id: user._id,
        },
        token: generateJWT({
          id: user._id,
        }),
      });
    } catch (error) {
      return errorResponse(res, error, "LOGIN");
    }
  },
  checked: async (req, res) => {
    const { token } = req.query; //http:localhost:4000/api/auth/chekced?token=ardfghjsaf
    try {
      if (!token) {
        throw createError(400, "Token inexistente");
      }
      const user = await User.findOne({
        token,
      });
      if (!user) {
        throw createError(400, "Token invalido");
      }

      user.checked = true;
      user.token = "";

      await user.save();

      return res.status(201).json({
        ok: true,
        msg: "Registro completado existosamente",
      });
    } catch (error) {
      return errorResponse(res, error, "CHECKED");
    }
  },
  sendToken: async (req, res) => {
    const { email } = req.body;
    try {
      let user = await User.findOne({ email });

      if (!user)
        throw createError(400, "El email es incorrecto o no está checkeado");

      const token = generateTokenRandom();

      user.token = token;
      await user.save();

      //TODO: Enviar email para reestablecer contraseña

      await forgotPassword({
        name: user.name,
        email: user.email,
        token: user.token,
      });

      return res.status(200).json({
        ok: true,
        msg: "Se ha enviado a un email con las instrucciones",
      });
    } catch (error) {
      return errorResponse(res, error, "SEND-TOKEN");
    }
  },
  verifyToken: async (req, res) => {
    try {
      const { token } = req.query;
      if (!token) throw createError(400, "No hay token en la peticion");

      const user = await User.findOne({
        token,
      });
      if (!user) throw createError(400, "Token invalido");

      return res.status(200).json({
        ok: true,
        msg: "Token verificado",
      });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error, "VERIFY-TOKEN");
    }
  },
  changePassword: async (req, res) => {
    try {
      const { token } = req.query;
      const { password } = req.body;

      if (!password) throw createError(400, "El password es obligatorio");
      const user = await User.findOne({
        token,
      });
      if (!user) throw createError(400, "El token es invalido");
      user.password = password;
      user.token = "";

      await user.save();

      return res.status(200).json({
        ok: true,
        msg: "Password actualizado",
      });
    } catch (error) {
      console.log(error);
      return errorResponse(res, error, "CHANGE-PASSWORD");
    }
  },
};
