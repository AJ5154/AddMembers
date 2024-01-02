import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Field, FormikProvider, useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { APIErrorResponse } from "../common/types/APIErrorResponse.type";
import {
  setLocalStorage,
  LocalStorageKey,
} from "../common/utilities/localStorage";

interface LoginProps {
  email: string;
  password: string;
}

interface NewType {
  value: string;
}

interface IFieldProps {
  field: NewType;
  meta: {
    touched: boolean;
    error: string;
  };
}
const SignIn = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async () => {
      console.log(formik.values);

      const loginResponse = (await postLoginData(
        formik.values
      )) as LoginApiResponse;
      const jwtToken = loginResponse.data.entity.token.accessToken;
      setLocalStorage(LocalStorageKey.AccessToken, jwtToken);
      formik.handleReset(null);
      navigate("/Member");
    },
  });

  const postLoginData = async (
    data: LoginProps
  ): Promise<LoginApiResponse | void> => {
    try {
      const response = await axios.post(
        "http://localhost:7575/api/v1/auth/login",
        data
      );
      const apiData = response.data as LoginApiResponse;
      return apiData;
    } catch (error: unknown) {
      if (error instanceof APIErrorResponse) {
        console.error(error.message);
      }
    }
  };
  return (
    <Container component="form" maxWidth="sm">
      <Typography component="h1" variant="h3" align="center">
        GymBook
      </Typography>
      <Paper
        elevation={12}
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Typography component="h1" variant="h4">
          Sign in to your account
        </Typography>
        <FormikProvider value={formik}>
          <Field name="email">
            {({ field, meta }: IFieldProps) => (
              <TextField
                {...field}
                label="Email Address"
                variant="standard"
                fullWidth
                autoFocus
                sx={{ mx: "auto" }}
                error={meta.touched && meta.error ? true : false}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
          <Field name="password">
            {({ field, meta }: IFieldProps) => (
              <TextField
                {...field}
                label="Password"
                variant="standard"
                fullWidth
                type="password"
                error={meta.touched && meta.error ? true : false}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
          <Button
            variant="contained"
            sx={{ mt: 4 }}
            fullWidth
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            Sign In
          </Button>
          <Typography
            component="p"
            sx={{ fontSize: "15px", mt: 3 }}
            variant="h6"
          >
            Create a new account? <Link to="/signup">Sign up</Link>
          </Typography>
        </FormikProvider>
      </Paper>
    </Container>
  );
};

export default SignIn;
