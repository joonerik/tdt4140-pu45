import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuth } from '../components/UserContext/auth';
import axios from 'axios';
import NumberFormat from 'react-number-format';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignUp() {
  const classes = useStyles();
  const { setAuthTokens } = useAuth();
  const { authTokens } = useAuth();
  const API_URL = "http://127.0.0.1:8000/api/register/"

  function postRegister(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    axios.post(API_URL, {
      'name': formData.get("firstName"), 
      'password': formData.get("password"), 
      'email': formData.get("email"), 
      'phone': formData.get("phone"), 
      'address': formData.get("address"), 
    }).then((res) => {
      if (res.status === 200) {
        console.log("Register success")
        axios.post("http://127.0.0.1:8000/api/token/", {
          'username': formData.get("email"), 
          'password': formData.get("password")
        }).then((resLog) => {
          console.log("Login success")
          localStorage.setItem('userData', JSON.stringify(res.data.user))
          localStorage.setItem('user', true);
          setAuthTokens(res.data)
        }).catch((e) => {
          console.log(e.res)
        })
      } else {
        console.log("Unknown error - Status: " + res.status)
      }
    }).catch((error) => {
      if (error.response.status === 401) {
        console.log("catch 401: Unauthorized -> wrong mail or password" )
      } else if (error.response.status === 400) {
        console.log("catch 400: Bad req -> missing fields etc" )
      } else {
        console.log("catch something else")
        console.log(error.response)
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
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={postRegister}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={e => {
                  setLastName(e.target.value);
                }}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="address"
                label="Address"
                id="adresse"
              />
            </Grid>
            <Grid item xs={12}>
              <NumberFormat
                customInput={TextField}
                id="phone"
                label="PhoneNumber"
                format="+47 ### ## ###"
                size="medium"
                variant="outlined"
                name="phone"
                required
                fullWidth
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}