DROP TABLE IF EXISTS "todos";

CREATE TABLE "todos" (
	"id" SERIAL PRIMARY KEY,
	"todo" VARCHAR(25) NOT NULL,
	"notes" VARCHAR(256),
	"isComplete" BOOLEAN DEFAULT FALSE
);

INSERT INTO "todos"
  ("todo", "notes")
  VALUES 
  ('Build a CRUD app', 'no notes for now'),
  ('Make my app look nice', 'no notes for now');

