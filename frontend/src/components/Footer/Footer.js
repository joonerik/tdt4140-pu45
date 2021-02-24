import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
        TDT4140 - Group 45
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "theme.palette.background.paper",
    padding: theme.spacing(6),
    position: "absolute",
    width: "100%",
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        Dinnerpool
      </Typography>
      <Copyright />
    </footer>
  );
}

export default Footer;
