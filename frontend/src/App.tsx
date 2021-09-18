import * as React from "react";
import { FunctionComponent, useState } from "react";
import {
  AppBar,
  CssBaseline,
  Box,
  Toolbar,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material";
import { PeopleList } from "./components/PeopleList";
import { CreatePersonDialog } from "./components/CreatePersonDialog";
import { Button } from "@material-ui/core";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Person } from "@klingenm/api-common";
import { createPerson } from "./api";

export const App: FunctionComponent = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [createdPeople, setCreatedPeople] = useState<Person[]>([]);
  const [error, setError] = useState<Error>();

  function handleSave(newPerson: Omit<Person, "id">) {
    createPerson(newPerson)
      .then((newPerson) => setCreatedPeople([...createdPeople, newPerson]))
      .catch(setError).finally(() => setOpen(false));
  }

  return (
    <>
      <CssBaseline />
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
              rest api demo
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddBoxIcon />}
              onClick={() => setOpen(true)}
            >
              Create Person
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {error && (
        <Alert severity="error">
          <AlertTitle>{error.message}</AlertTitle>
          {/* Normally I would not bleed internal info like this */}
          <pre>{error.stack}</pre>
        </Alert>
      )}
      <CreatePersonDialog
        isOpen={isOpen}
        submit={handleSave}
        cancel={() => setOpen(false)}
      />
      <Box>
        <PeopleList createdPeople={createdPeople} />
      </Box>
    </>
  );
};
