import * as React from "react";
import { FunctionComponent } from "react";
import { AppBar, CssBaseline, Box, Toolbar, Typography } from "@mui/material";
import { DataLoader } from "./components/DataLoader";
import { PeopleList } from "./components/PeopleList";

export const App: FunctionComponent = () => {
  return (
    <>
      <CssBaseline />
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h3">rest api demo</Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box>
        <PeopleList />
      </Box>
    </>
  );
};
