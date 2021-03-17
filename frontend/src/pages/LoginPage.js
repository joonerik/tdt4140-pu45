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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();

  const API_URL = "http://127.0.0.1:8000/api/token/"

  function postLogin() {
    axios.post(API_URL, {
    'username': email, 
    'password': password
    }).then((res) => {
      if (res.status === 200) {
        console.log("Response: " + res.status)
        setAuthTokens(res.data)
        setLoggedIn(true)
      } else {
        console.log("Unknown error - Status: " + res.status)
        setIsError(true)
      }
    }).catch((error) => {
      if (error.response.status === 401) {
        setIsError(true)
        console.log("catch 401: Unauthorized -> wrong mail or password" )
      } else if (error.response.status === 400) {
        console.log("catch 400: Bad req -> missing fields etc" )
      } else {
        console.log("catch something else")
      }
    });
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            // value={email}
            onChange={e => {
              setEmail(e.target.value);
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
              // postLogin().then(console.log("posted"))
              postLogin();
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