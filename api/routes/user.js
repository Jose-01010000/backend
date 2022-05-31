const express = require("express");
const router = express.Router();
const md5 = require("md5");

const mysqlConnection = require("../connection/connection");

const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  mysqlConnection.query("select * from usuarios", (err, row, fields) => {
    if (!err) {
      res.json(row);
    } else {
      console.log(err);
    }
  });
});

router.post("/register", (req, res) => {
  const { nombre, apellido, correo, contrasena, fechaNacimiento, rolUsuario } =
    req.body;

  const hasContrasena = md5(contrasena.toString());
  const comprobarUsario = "select correo from usuarios where correo = ?";

  mysqlConnection.query(comprobarUsario, [correo], (err, result, fields) => {
    if (!result.length) {
      const sql =
        "insert into usuarios (nombre, Apellido, correo, contraseña, fecha_nacimiento, rol_usuario) values (?, ?,?, ?, ?, ?)";
      mysqlConnection.query(
        sql,
        [nombre, apellido, correo, hasContrasena, fechaNacimiento, rolUsuario],
        (err, result, fields) => {
          if (err) {
            res.json({ status: 0, data: err });
          } else {
            let data = JSON.stringify(result);
            const token = jwt.sign(data, "keySecret");
            res.json({ token, status: 1, mensaje: "Registro existoso" });
          }
        }
      );
    } else {
      res.json({ status: 2, mensaje: "Usuario ya se encuentra registrado" });
    }
  });
});

router.post("/singin", (req, res) => {
  const { correo, contrasena } = req.body;
  const hasContrasena = md5(contrasena.toString());
  mysqlConnection.query(
    "select nombre, correo, rol_usuario from usuarios where correo = ? and contraseña = ?",
    [correo, hasContrasena],
    (err, rows, fields) => {
      if (!err) {
        if (rows.length > 0) {
          let data = JSON.stringify(rows[0]);
          const token = jwt.sign(data, "keySecret");
          res.json({ token });
        } else {
          res.json({ status: "Usuario o contraseña incorrectos" });
        }
      } else {
        console.log(err);
      }
    }
  );
});

router.post("/test", verifyToken, (req, res) => {
  res.json("Información");
});

function verifyToken(req, res, next) {
  if (!req.headers.authorization) return res.status(401).json("No autorizado");

  const token = req.headers.authorization.substr(7);
  if (token !== "") {
    const content = jwt.verify(token, "keySecret");
    req.data = content;
    next();
  } else {
    res.status(401).json("Token vacio");
  }
}

module.exports = router;
