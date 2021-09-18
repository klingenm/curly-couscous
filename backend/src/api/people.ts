import { Person } from "@klingenm/api-common";
import { Router } from "express";
import shortid from "shortid";
import { dataSet } from "./data";

const people = Router();

people.get("/", async (req, res) => {
  const { people } = await dataSet;
  res.json(people);
});

people.post("/", async (req, res) => {
  const { people } = await dataSet;

  // We should have a proper data repository or service, but we'll just do it here for now.
  const { body: payload } = req;
  const newPerson = Person.fromPlain(payload);
  newPerson.id = shortid();
  newPerson.created = new Date();

  // Persist the new person to the store for this run
  people.push(newPerson);
  res.send(newPerson.toPlain());
});

people.delete("/:id", async (req, res) => {
  const { people } = await dataSet;

  const index = people.findIndex((item) => item.id === req.params.id);
  if (index === -1) {
    return res.sendStatus(404);
  }

  people.splice(index, 1);

  res.sendStatus(204);
});

export { people };
