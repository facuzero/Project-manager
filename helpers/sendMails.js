const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

module.exports = {
  confirmRegister: async (data) => {
    try {
      const { name, email, token } = data;

      await transport.sendMail({
        from: "Project Manager <info@projectmanager.com>",
        to: email,
        subject: "Confirmá tu cuenta",
        text: "Confirmá tu cuenta en project manager",
        html: `
            <p> Hola ${name}, haz click en el siguiente enlace para confirmar tu cuenta </p>
            <a href="${process.env.URL_FRONT}/confirm/${token}">Confirma tu cuenta </a>
            `,
      });
    } catch (error) {
      console.log(error);
    }
  },
  forgotPassword: async (data) => {
    try {
      const { name, email, token } = data;

      await transport.sendMail({
        from: "Project Manager <info@projectmanager.com>",
        to: email,
        subject: "Reestablecé tu contraseña",
        text: "Reestablece tu contraseña en project manager",
        html: `
            <p> Hola ${name}, haz click en el siguiente enlace para reestablecer tu contraseña </p>
            <a href="${process.env.URL_FRONT}/recover-password/${token}"> Reestablecer contraseña </a>
            `,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
