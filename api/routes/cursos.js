const express = require("express");
const router = express.Router();

const mysqlConnection = require("../connection/connection");

router.get("/cursos", function (req, res) {
  mysqlConnection.query(
    "SELECT c.nombre, c.Descripcion, COUNT(s.id_curso) as 'secciones' FROM cursos c LEFT JOIN secciones s ON c.id_curso = s.id_curso GROUP BY c.id_curso LIMIT 3",
    [req.params.id],
    (err, rows) => {
      if (err) throw err;
      else {
        res.json(rows);
      }
    }
  );
});

module.exports = router;
