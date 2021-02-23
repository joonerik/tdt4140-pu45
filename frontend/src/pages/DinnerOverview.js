import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import DinnerList from "../components/DinnerList/DinnerList";
import Box from '@material-ui/core/Box';


export default function DinnerOverview(props) {

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Box p={4}>
        <DinnerList />
        </Box>
      </main>
    </React.Fragment>
  );
}
