import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import useStyles from "./styles";
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [isSignup, setIsSignUp] = useState(false);

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignup) {
     dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value});
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const token = res.credential;
    const decoded: { name: string, picture: string, sub: string } = jwt_decode(
      res.credential
    );

    const { email, family_name, given_name, name, picture, sub } = decoded;
    const result = {
      email,
      familyName: family_name,
      givenName: given_name,
      googleId: sub,
      name: name,
      imageUrl: picture,
    };

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log("Google Sign In was unsuccessful. Try Again Later");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            className={classes.submit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            theme="filled_blue"
            width="364px"
            onSuccess={googleSuccess}
            onError={googleFailure}
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Dont have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
