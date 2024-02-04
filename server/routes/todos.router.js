const router = require("express").Router();
const pool = require("../modules/pool");

const pg = require("pg"); //import pg

// GET
router.get("/", (req, res) => {
  let getQueryText = `SELECT * FROM "todos";`;

  pool
    .query(getQueryText)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })

    .catch((err) => {
      console.log("error getting todo data", err);
      res.sendStatus(500);
    });
});

// POST
router.post("/", (req, res) => {
  let newKoala = req.body;
  console.log(`Adding new koala`, newKoala);

  let queryText = `INSERT INTO "koalas" ("name", "favorite_color", "age", "ready_to_transfer", "notes")
    VALUES ($1, $2, $3, $4, $5);`;

  pool
    .query(queryText, [
      newKoala.name,
      newKoala.favorite_color,
      newKoala.age,
      newKoala.ready_to_transfer,
      newKoala.notes,
    ])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error adding new koala`, error);
      res.sendStatus(500);
    });
});

// PUT
router.put("/:id", (req, res) => {
  console.log(`PUT on the server`);
  let id = req.params.id;

  let putsqlText =
    'UPDATE koalas SET "ready_to_transfer" = NOT "ready_to_transfer" WHERE id=$1;';
  pool
    .query(putsqlText, [id])
    .then((result) => {
      console.log(`put query worked. ${putsqlText}`, result);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(`put query failed. ${putsqlText}`, err);
      res.sendStatus(500);
    });
});

// DELETE

router.delete("/:id", (req, res) => {
  console.log("rew params: ", req.params);
  let id = req.params.id;

  let queryText = `DELETE FROM "koalas" WHERE "id" = $1;`;

  pool
    .query(queryText, [id])
    .then((result) => {
      console.log(`DELETE query worked, ${queryText}`, result);
      res.send(204);
    })
    .catch((error) => {
      console.log(`DELETE query failed, ${queryText}`, error);
      res.sendStatus(500);
    });
});

module.exports = router;
