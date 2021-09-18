import { Person } from "@klingenm/api-common";
import axios, { AxiosResponse } from "axios";

function checkResponse(res: AxiosResponse, expectedCode: number = 200) {
  if (res.status !== expectedCode) {
    throw new Error(
      `Request failed ${res.status} ${res.statusText}: ${res.data}`
    );
  }
}

export async function getPeople(): Promise<Person[]> {
  const res = await axios.get("/api/people");
  checkResponse(res);
  return res.data.map(Person.fromPlain);
}

export async function updatePerson(person: Person) {
  const res = await axios.put<Person>(
    `/api/people/${person.id}`,
    person.toPlain()
  );
  checkResponse(res);
  return Person.fromPlain(res.data);
}

export async function createPerson(
  person: Person
): Promise<Person> {
  const res = await axios.post<Person>(`/api/people`, person.toPlain());
  checkResponse(res);
  return Person.fromPlain(res.data);
}

export async function deletePerson(id: string) {
  const res = await axios.delete<Person>(`/api/people/${id}`);
  checkResponse(res);
}
