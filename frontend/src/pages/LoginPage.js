import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuth } from '../components/UserContext/auth'
import axios from 'axios'
import { Redirect } from 'react-router';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();

  const API_URL = "http://iterasjon1.herokuapp.com/api/token"
  
  function postLogin() {
    axios.post(API_URL, {
      mail, password
    }).then(res => {
      console.log('Response status: ' + res.status)
      if (res.status === 200) {
        setAuthTokens(res.data);
        console.log('Data: ' + res.data)
        setLoggedIn(true);
      } else {
        setIsError(true);
      }
    }).catch(error => {
      setIsError(true)
      console.log(error)
      console.log("catch block")
    })
  }

  if (isLoggedIn) {
    return <Redirect to='/' />
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="mail"
            label="Email Address"
            name="mail"
            autoComplete="mail"
            autoFocus
            // value={mail}
            onChange={e => {
              setMail(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            // value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=> {
              postLogin()
            }}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link to="/login" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link to="/register"  variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
          { isError && <p>The username or password provided were incorrect!</p> }
        </form>
      </div>
    </Container>
  );
}