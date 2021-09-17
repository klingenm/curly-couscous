import axios, { AxiosResponse } from "axios";
import * as dtos from '@klingenm/api-common';
import { Gender } from "@klingenm/api-common";
import shortid from "shortid";

interface SwapiPage<T> {
    count: number;
    next: string;
    previous: string | null;
    results: T[];
}

interface Person {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    created: string;
    edited: string;
}

export function sanitizePeople(response: AxiosResponse<SwapiPage<Person>>) {
    if (response.status !== 200) {
        throw new Error('Could not load data');
    }
    const sanitizePerson = (person: Person) => ({
        id: shortid(),
        name: person.name,
        mass: Number(person.mass),
        gender: person.gender as Gender,
        birthYear: person.birth_year,
        created: new Date(person.created),
        updated: new Date(person.edited),
    });

    return response.data.results.map((person) => dtos.Person.fromPlain(sanitizePerson(person)));
}

export default async function loadDataFromSwapi() {
  const swapiClient = axios.create({
    baseURL: "https://swapi.dev/api/",
  });

  return {
    people: sanitizePeople(await swapiClient.get<SwapiPage<Person>>('people')),
  };
}
