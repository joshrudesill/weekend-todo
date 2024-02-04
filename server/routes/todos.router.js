const router = require("express").Router();
const pool = require("../modules/pool");

const pg = require("pg"); //import pg

// GET
router.get("/", (req, res) => {
  let getQueryText = `SELECT * FROM "todos" ORDER BY todo ASC;`;

  pool
    .query(getQueryText)
    .then((result) => {
      res.send(result.rows);
    })

    .catch((err) => {
      console.log("error getting todo data", err);
      res.sendStatus(500);
    });
});

// POST
router.post("/", (req, res) => {
  let newTodo = req.body;
  console.log(`Adding new todo`, newTodo);

  let queryText = `INSERT INTO "todos" ("todo", "notes")
    VALUES ($1, $2);`;

  pool
    .query(queryText, [newTodo.todo, newTodo.notes])
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
    'UPDATE "todos" SET "isComplete" = NOT "isComplete" WHERE id=$1;';
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
  let id = req.params.id;

  let queryText = `DELETE FROM "todos" WHERE "id" = $1;`;

  pool
    .query(queryText, [id])
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

module.exports = router;
