import { Person } from "@klingenm/api-common";
import axios from "axios";


export async function getPeople(): Promise<Person[]> {
    const res = await axios.get('/api/people');
    if (res.status !== 200) {
        throw new Error(res.statusText + res.data);
    }

    return res.data.map(Person.fromPlain);
}
