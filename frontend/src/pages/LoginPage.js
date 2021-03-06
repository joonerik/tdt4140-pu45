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

  const [isError, setIsError] = useState(false);
  const { setAuthTokens } = useAuth();
  const { authTokens } = useAuth();

  const API_URL = "http://127.0.0.1:8000/api/token/"

  function postLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target)
    axios.post(API_URL, {
    'username': formData.get("email"), 
    'password': formData.get("password")
    }).then((res) => {
      if (res.status === 200) {
        console.log("Response: " + res.status)
        // should set localstorage userData here 
        localStorage.setItem('user', true);
        setAuthTokens(res.data)
        axios.get("http://localhost:8000/hello/", { headers: {"Authorization" : `Bearer ${res.data.access}`} }).then((r) => {
          console.log(r)
          localStorage.setItem('userData', JSON.stringify(r.data.user))
        }).catch((e) => {
            console.log(e)
            console.log(e.response)
        })
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

  if (authTokens) {
    return <Redirect to='/' />
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={postLogin}>
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
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
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