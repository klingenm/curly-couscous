import { Router } from "express";
import { dataSet } from "./data";

const people = Router();

people.get("/", async (req, res) => {
  const { people } = await dataSet;
  res.json(people);
});

export { people };
