import * as React from "react";
import { useState, FormEventHandler } from "react";
import {
  Box,
  Button,
  Dialog,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Gender, Person } from "@klingenm/api-common";

export interface CreatePersonProps {
  isOpen: boolean;
  submit: (person: Person) => void;
  cancel: () => void;
}

type PersonProp = keyof Person;

export function CreatePersonDialog(props: CreatePersonProps) {
  const [person, setPerson] = useState<Person>(new Person());
  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    props.submit(person);
    return false;
  };

  function onChange<T extends PersonProp>(what: T, value: Person[T]) {
    setPerson(Person.fromPlain({
     ...person,
     [what]: value
    }));
  }

  return (
    <Dialog open={props.isOpen}>
      <Paper elevation={2}>
        <Box component="form" onSubmit={onSubmit}>
          <Stack spacing={2} sx={{ margin: 2 }}>
            <Typography variant="h5">Create person</Typography>
            <TextField
              required
              label="Name"
              name="name"
              value={person.name || ''}
              onChange={(event) => onChange("name", event.target.value)}
            />
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="person-create-gender-label">Gender</InputLabel>
              <Select
                labelId="person-create-gender-label"
                label="Gender"
                name="gender"
                value={person.gender || ''}
                onChange={(event) =>
                  onChange("gender", event.target.value as Gender)
                }
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="N/A">N/A</MenuItem>
              </Select>
            </FormControl>
            <TextField
              required
              label="Mass"
              name="mass"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*(.[0-9]+)?" }}
              value={person.mass || ''}
              onChange={(event) =>
                onChange("mass", parseFloat(event.target.value))
              }
            />
            <Stack direction="row" spacing={2}>
              <Button type="submit" variant="contained" color="primary">
                Create
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => props.cancel()}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Dialog>
  );
}
