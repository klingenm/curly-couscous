import * as React from "react";
import { Person } from "@klingenm/api-common";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getPeople } from "../api";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1, editable: true },
  { field: "gender", headerName: "Gender", flex: 0.5, editable: true },
  { field: "created", headerName: "Created", flex: 1, type: "dateTime" },
];

export function PeopleList() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [people, setPeople] = useState<Person[]>([]);
  useEffect(() => {
    getPeople()
      .then(setPeople)
      .finally(() => setIsLoading(false));
  });

  return <DataGrid editMode="row" autoHeight={true} columns={columns} rows={people} />;
}
