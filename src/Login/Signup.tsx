import {
    Button,
    Container,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
  } from "@mui/material";
  import axios from "axios";
  import { Field, FormikProvider, useFormik } from "formik";
  import { Link, useNavigate } from "react-router-dom";
  import * as Yup from "yup";
import { APIErrorResponse } from "../common/types/APIErrorResponse.type";
  
  enum PrefixEnum {
    MR = "MR",
    MRS = "MRS",
    MISS = "MISS",
  }
  
  enum GenderEnum {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER",
    UNSPECIFIED = "UNSPECIFIED",
  }
  
  interface SignupProps {
    prefix: PrefixEnum.MR | PrefixEnum.MRS | PrefixEnum.MISS;
    firstName: string;
    lastName: string;
    email: string; 
    phone: string; 
    gender:
      | GenderEnum.MALE
      | GenderEnum.FEMALE
      | GenderEnum.OTHER
      | GenderEnum.UNSPECIFIED;
    password: string;
    dateOfBirth: string; 
    middleName?: string; 
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
  
  const Signup = () => {
    const navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        dateOfBirth: "",
        middleName: "",
        gender: GenderEnum.UNSPECIFIED,
        prefix: PrefixEnum.MR,
      },
      validationSchema: Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        middleName: Yup.string().required("Middle Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string().email("Invalid Email").required("Email is required"),
        phone: Yup.string().required("Phone is required"),
        password: Yup.string().required("Password is required"),
        prefix: Yup.string().oneOf(
          [PrefixEnum.MR, PrefixEnum.MRS, PrefixEnum.MISS],
          "Invalid prefix"
        ),
        gender: Yup.string()
          .oneOf(
            [
              GenderEnum.MALE,
              GenderEnum.FEMALE,
              GenderEnum.OTHER,
              GenderEnum.UNSPECIFIED,
            ],
            "Invalid gender"
          )
          .required("Gender is required"),
        dateOfBirth: Yup.date().required("Date of Birth is required"),
      }),
      onSubmit: async () => {
        try {
          console.log(formik.values);
          await postSignupData(formik.values);
          navigate("/");
          formik.handleReset(null);
        } catch (error: unknown) {
          if (error instanceof APIErrorResponse) {
            console.error(error.message);
          }
        }
      },
    });
  
    const postSignupData = async (data: SignupProps) => {
      try {
        const response = await axios.post(
          "http://localhost:7575/api/v1/auth/signup",
          data
        );
        return response.data;
      } catch (error: unknown) {
        if (error instanceof APIErrorResponse) {
          console.error(error.message);
        }
        return [];
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
            Create a new account
          </Typography>
          <FormikProvider value={formik}>
            <Field name="prefix">
              {({ field, meta }: IFieldProps) => (
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-label">Prefix</InputLabel>
                  <Select
                    {...field}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Prefix"
                  >
                    <MenuItem value={PrefixEnum.MR}>MR</MenuItem>
                    <MenuItem value={PrefixEnum.MRS}>MRS</MenuItem>
                    <MenuItem value={PrefixEnum.MISS}>MISS</MenuItem>
                  </Select>
                  {meta.touched && meta.error ? (
                    <FormHelperText>{meta.error}</FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              )}
            </Field>
            <Field name="firstName">
              {({ field, meta }: IFieldProps) => (
                <TextField
                  {...field}
                  label="First Name"
                  variant="standard"
                  fullWidth
                  autoFocus
                  sx={{ mx: "auto" }}
                  error={meta.touched && meta.error ? true : false}
                  helperText={meta.touched && meta.error ? meta.error : ""}
                />
              )}
            </Field>
            <Field name="middleName">
              {({ field, meta }: IFieldProps) => (
                <TextField
                  {...field}
                  label="Middle Name"
                  variant="standard"
                  fullWidth
                  error={meta.touched && meta.error ? true : false}
                  helperText={meta.touched && meta.error ? meta.error : ""}
                />
              )}
            </Field>
            <Field name="lastName">
              {({ field, meta }: IFieldProps) => (
                <TextField
                  {...field}
                  label="Last Name"
                  variant="standard"
                  fullWidth
                  error={meta.touched && meta.error ? true : false}
                  helperText={meta.touched && meta.error ? meta.error : ""}
                />
              )}
            </Field>
            <Field name="email">
              {({ field, meta }: IFieldProps) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="standard"
                  fullWidth
                  error={meta.touched && meta.error ? true : false}
                  helperText={meta.touched && meta.error ? meta.error : ""}
                />
              )}
            </Field>
            <Field name="phone">
              {({ field, meta }: IFieldProps) => (
                <TextField
                  {...field}
                  label="Phone No."
                  variant="standard"
                  fullWidth
                  error={meta.touched && meta.error ? true : false}
                  helperText={meta.touched && meta.error ? meta.error : ""}
                />
              )}
            </Field>
            <Field name="gender">
              {({ field, meta }: IFieldProps) => (
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    {...field}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Prefix"
                  >
                    <MenuItem value={GenderEnum.MALE}>MALE</MenuItem>
                    <MenuItem value={GenderEnum.FEMALE}>FEMALE</MenuItem>
                    <MenuItem value={GenderEnum.OTHER}>OTHER</MenuItem>
                    <MenuItem value={GenderEnum.UNSPECIFIED}>
                      UNSPECIFIED
                    </MenuItem>
                  </Select>
                  {meta.touched && meta.error ? (
                    <FormHelperText>{meta.error}</FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
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
            <Field name="dateOfBirth">
              {({ field, meta }: IFieldProps) => (
                <TextField
                  {...field}
                  label="Date Of Birth"
                  variant="standard"
                  fullWidth
                  type="date"
                  margin="normal"
                  error={meta.touched && meta.error ? true : false}
                  helperText={meta.touched && meta.error ? meta.error : ""}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
              Signup
            </Button>
            <Typography
              component="p"
              sx={{ fontSize: "15px", mt: 3 }}
              variant="h6"
            >
              Already have an account? <Link to="/">Log In</Link>
            </Typography>
          </FormikProvider>
        </Paper>
      </Container>
    );
  };
  
  export default Signup;
  