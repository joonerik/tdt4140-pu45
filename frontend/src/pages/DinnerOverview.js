import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import DinnerList from "../components/DinnerList/DinnerList";
import Footer from "../components/Footer/Footer";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    // backgroundColor: theme.palette.info.light,
    background: 'linear-gradient(0deg, #1976d2 20%, #FF8E53 90%)',
    // boxShadow: '0 20px 2px 0 #a6d4fa',
    padding: theme.spacing(8, 0, 6),
    spacing: 2,
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function DinnerOverview(props) {
  const classes = useStyles();

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
