import * as React from "react";
import { Person } from "@klingenm/api-common";
import { useCallback, useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { getPeople } from "../api";
import { Alert, AlertTitle } from "@mui/material";



interface PeopleListProps {
  createdPeople: Person[];
}

export function PeopleList(props: PeopleListProps) {
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [people, setPeople] = useState<Person[]>([]);
  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);
  
  const columns = [
    { field: "name", headerName: "Name", flex: 1, editable: true },
    { field: "gender", headerName: "Gender", flex: 0.5, editable: true },
    { field: "created", headerName: "Created", flex: 1, type: "dateTime" },
  ];
  const rows = [...people, ...props.createdPeople];

  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>{error.message}</AlertTitle>
        {/* Normally I would not bleed internal info like this */}
        <pre>{error.stack}</pre>
      </Alert>
    );
  }

  return (
    <DataGrid
      hideFooterPagination
      editMode="row"
      autoHeight={true}
      columns={columns}
      rows={rows}
    />
  );
}
