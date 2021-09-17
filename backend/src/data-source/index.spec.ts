import mockAxios from "jest-mock-axios";
import { Person } from "@klingenm/api-common";
import loadDataFromSwapi, { sanitizePeople } from ".";
import { allPeople as dirtyCrowd } from "./__fixtures/swapi-data";

describe("dataLoad", () => {
  it("load data from swapi.dev", async () => {
    loadDataFromSwapi();
    expect(mockAxios.create).toHaveBeenCalledWith({
      baseURL: "https://swapi.dev/api/",
    });
    expect(mockAxios.get).toHaveBeenCalledWith("people");
  });
});

describe("sanitizePeople", () => {
  it("makes People", () => {
    const people = sanitizePeople({
      status: 200,
      data: dirtyCrowd,
      statusText: "OK",
      config: {},
      headers: {},
    });

    expect(people).toHaveLength(10);
    expect(people[0]).toBeInstanceOf(Person);
  });
});
