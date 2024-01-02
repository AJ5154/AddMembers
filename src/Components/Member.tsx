import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
  Paper,
} from "@mui/material";
import axios from "axios";
import { Field, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { getLocalStorage, LocalStorageKey } from "../common/utilities/localStorage";

export interface Member {
  firstName: string;
  lastName: string;
  mobile: string;
  countryShortCode: string;
  countryCode: string;
  email: string;
  dob: Date;
  gender: string;
  dateOfJoing: Date;
  address: string;
  notes: string;
  plans: Plan[];
}

export interface Plan {
  planId: string;
  batchId: string;
  startDate: Date;
  trainingType: string;
  admissionFees: number;
  discount: number;
  discountType: string;
  payments: Payment[];
}

export interface Payment {
  amountPaid: number;
}

interface IFieldProps {
  field: {
    value: string;
  };
  meta: {
    touched: boolean;
    error: string;
  };
}

const Member = () => {
  const [memberDetails, setMemberDetails] = useState([]);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      countryShortCode: "",
      countryCode: "",
      email: "",
      dob: "",
      gender: "",
      dateOfJoing: "",
      address: "",
      notes: "",
      plans: [
        {
          planId: "",
          batchId: "",
          startDate: "",
          trainingType: "",
          admissionFees: 0,
          discount: 0,
          discountType: "",
          payments: [
            {
              amountPaid: 0,
            },
          ],
        },
      ],
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      mobile: Yup.string().required("Mobile is required"),
      countryShortCode: Yup.string().required("Country Short Code is required"),
      countryCode: Yup.string().required("Country Code is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      dob: Yup.date().required("Date of Birth is required"),
      gender: Yup.string().required("Gender is required"),
      dateOfJoing: Yup.date().required("Date of Joining is required"),
      address: Yup.string().required("Address is required"),
      notes: Yup.string(),
      plans: Yup.array().of(
        Yup.object().shape({
          startDate: Yup.date().required("Start Date is required"),
          trainingType: Yup.string().required("Training Type is required"),
          admissionFees: Yup.number().required("Admission Fees is required"),
          discount: Yup.number().required("Discount is required"),
          discountType: Yup.string().required("Discount Type is required"),
          payments: Yup.array().of(
            Yup.object().shape({
              amountPaid: Yup.number().required("Amount Paid is required"),
            })
          ),
        })
      ),
    }),
    onSubmit: async () => {
      console.log(formik.values);
      const token = getLocalStorage(LocalStorageKey.AccessToken);
      await axios.post(
        "http://localhost:7575/api/v1/gyms/61d6c0a4-55ac-436b-813b-68c48cd9158e/members",
        formik.values,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
    },
  });

  const getMemberData = async () => {
    try {
      const token = getLocalStorage(LocalStorageKey.AccessToken);
      const response = await axios.get(
        "http://localhost:7575/api/v1/gyms/61d6c0a4-55ac-436b-813b-68c48cd9158e/members",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  };

  const loadMemberData = async () => {
    const loadData = await getMemberData();
    setMemberDetails(loadData);
  };
  useEffect(() => {
    loadMemberData();
  }, []);
  return (
    <FormikProvider value={formik}>
      <Paper elevation={3} sx={{ maxWidth: "50%", ml: 50 }}>
        <Field name="firstName">
          {({ field, meta }: IFieldProps) => (
            <TextField
              {...field}
              label="First Name"
              variant="standard"
              fullWidth
              sx={{ mx: "auto" }}
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
              sx={{ mx: "auto" }}
              error={meta.touched && meta.error ? true : false}
              helperText={meta.touched && meta.error ? meta.error : ""}
            />
          )}
        </Field>
        <Field name="countryShortCode">
          {({ field, meta }: IFieldProps) => (
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-label">
                Country Short Code
              </InputLabel>
              <Select
                {...field}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Country Short Code"
              >
                <MenuItem value={"AF"}>AF</MenuItem>
                <MenuItem value={"AU"}>AU</MenuItem>
                <MenuItem value={"BD"}>BD</MenuItem>
                <MenuItem value={"BR"}>BR</MenuItem>
                <MenuItem value={"CA"}>CA</MenuItem>
                <MenuItem value={"CN"}>CN</MenuItem>
                <MenuItem value={"DE"}>DE</MenuItem>
                <MenuItem value={"IS"}>IS</MenuItem>
                <MenuItem value={"IN"}>IN</MenuItem>
                <MenuItem value={"MY"}>MY</MenuItem>
                <MenuItem value={"SG"}>SG</MenuItem>
                <MenuItem value={"CH"}>CH</MenuItem>
              </Select>
              {meta.touched && meta.error ? (
                <FormHelperText>{meta.error}</FormHelperText>
              ) : (
                ""
              )}
            </FormControl>
          )}
        </Field>

        <Field name="countryCode">
          {({ field, meta }: IFieldProps) => (
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-label">countryCode</InputLabel>
              <Select
                {...field}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Country Code"
              >
                <MenuItem value={"+93"}>+93</MenuItem>
                <MenuItem value={"+61"}>+61</MenuItem>
                <MenuItem value={"+880"}>+880</MenuItem>
                <MenuItem value={"+55"}>+55</MenuItem>
                <MenuItem value={"+1"}>+1</MenuItem>
                <MenuItem value={"+86"}>+86</MenuItem>
                <MenuItem value={"+49"}>+49</MenuItem>
                <MenuItem value={"+354"}>+354</MenuItem>
                <MenuItem value={"+91"}>+91</MenuItem>
                <MenuItem value={"+60"}>+60</MenuItem>
                <MenuItem value={"+65"}>+65</MenuItem>
                <MenuItem value={"+41"}>+41</MenuItem>
              </Select>
              {meta.touched && meta.error ? (
                <FormHelperText>{meta.error}</FormHelperText>
              ) : (
                ""
              )}
            </FormControl>
          )}
        </Field>
        <Field name="mobile">
          {({ field, meta }: IFieldProps) => (
            <TextField
              {...field}
              label="Mobile"
              variant="standard"
              fullWidth
              sx={{ mx: "auto" }}
              error={meta.touched && meta.error ? true : false}
              helperText={meta.touched && meta.error ? meta.error : ""}
            />
          )}
        </Field>
        <Field name="dateOfJoing">
          {({ field, meta }: IFieldProps) => {
            return (
              <TextField
                {...field}
                label="Date Of Joining"
                variant="standard"
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                sx={{ mx: "auto" }}
                error={meta.touched && meta.error ? true : false}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            );
          }}
        </Field>
        <Field name="plans[0].planId">
          {({ field, meta }: IFieldProps) => (
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-label">Plan Id</InputLabel>
              <Select
                {...field}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Plan Id"
              >
                <MenuItem value={"morning"}>Morning</MenuItem>
              </Select>
              {meta.touched && meta.error ? (
                <FormHelperText>{meta.error}</FormHelperText>
              ) : (
                ""
              )}
            </FormControl>
          )}
        </Field>
        <Field name="plans[0].batchId">
          {({ field, meta }: IFieldProps) => (
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-label">Batch Id</InputLabel>
              <Select
                {...field}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Batch Id"
              >
                <MenuItem value={"morning"}>Morning</MenuItem>
              </Select>
              {meta.touched && meta.error ? (
                <FormHelperText>{meta.error}</FormHelperText>
              ) : (
                ""
              )}
            </FormControl>
          )}
        </Field>
        <Field name="plans[0].startDate">
          {({ field, meta }: IFieldProps) => (
            <TextField
              {...field}
              label="Start Date"
              variant="standard"
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
              sx={{ mx: "auto" }}
              error={meta.touched && meta.error ? true : false}
              helperText={meta.touched && meta.error ? meta.error : ""}
            />
          )}
        </Field>
        <Field name="plans[0].trainingType">
          {({ field, meta }: IFieldProps) => (
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-label">
                Training Type
              </InputLabel>
              <Select
                {...field}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Training Type"
              >
                <MenuItem value={"GENERAL"}>GENERAL</MenuItem>
                <MenuItem value={"PERSONAL"}>PERSONAL</MenuItem>
              </Select>
              {meta.touched && meta.error ? (
                <FormHelperText>{meta.error}</FormHelperText>
              ) : (
                ""
              )}
            </FormControl>
          )}
        </Field>
        <Field name="plans[0].admissionFees">
          {({ field, meta }: IFieldProps) => (
            <TextField
              {...field}
              label="Admission Fees"
              variant="standard"
              fullWidth
              type="number"
              sx={{ mx: "auto" }}
              error={meta.touched && meta.error ? true : false}
              helperText={meta.touched && meta.error ? meta.error : ""}
            />
          )}
        </Field>
        <Field name="plans[0].discountType">
          {({ field, meta }: IFieldProps) => (
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-label">
                Discount Type
              </InputLabel>
              <Select
                {...field}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Discount Type"
              >
                <MenuItem value={"PERCENTAGE"}>PERCENTAGE</MenuItem>
                <MenuItem value={"AMOUNT"}>AMOUNT</MenuItem>
              </Select>
              {meta.touched && meta.error ? (
                <FormHelperText>{meta.error}</FormHelperText>
              ) : (
                ""
              )}
            </FormControl>
          )}
        </Field>
        <Field name="plans[0].discount">
          {({ field, meta }: IFieldProps) => (
            <TextField
              {...field}
              label="Discount"
              variant="standard"
              fullWidth
              type="number"
              sx={{ mx: "auto" }}
              error={meta.touched && meta.error ? true : false}
              helperText={meta.touched && meta.error ? meta.error : ""}
            />
          )}
        </Field>
        <Field name="plans[0].payments[0].amountPaid">
          {({ field, meta }: IFieldProps) => (
            <TextField
              {...field}
              label="Amount Paid"
              variant="standard"
              fullWidth
              type="number"
              sx={{ mx: "auto" }}
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
                label="Gender"
              >
                <MenuItem value={"MALE"}>MALE</MenuItem>
                <MenuItem value={"FEMALE"}>FEMALE</MenuItem>
                <MenuItem value={"OTHER"}>OTHER</MenuItem>
                <MenuItem value={"UNSPECIFIED"}>UNSPECIFIED</MenuItem>
              </Select>
              {meta.touched && meta.error ? (
                <FormHelperText>{meta.error}</FormHelperText>
              ) : (
                ""
              )}
            </FormControl>
          )}
        </Field>
        <Field name="email">
          {({ field, meta }: IFieldProps) => (
            <TextField
              {...field}
              label="Email"
              variant="standard"
              fullWidth
              sx={{ mx: "auto" }}
              error={meta.touched && meta.error ? true : false}
              helperText={meta.touched && meta.error ? meta.error : ""}
            />
          )}
        </Field>
        <Field name="dob">
          {({ field, meta }: IFieldProps) => (
            <TextField
              {...field}
              label="Date Of Birth"
              variant="standard"
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
              sx={{ mx: "auto" }}
              error={meta.touched && meta.error ? true : false}
              helperText={meta.touched && meta.error ? meta.error : ""}
            />
          )}
        </Field>
        <Field name="address">
          {({ field, meta }: IFieldProps) => (
            <TextField
              {...field}
              label="Address"
              variant="standard"
              fullWidth
              sx={{ mx: "auto" }}
              error={meta.touched && meta.error ? true : false}
              helperText={meta.touched && meta.error ? meta.error : ""}
            />
          )}
        </Field>
        <Field name="notes">
          {({ field, meta }: IFieldProps) => (
            <TextField
              {...field}
              label="Notes"
              variant="standard"
              fullWidth
              sx={{ mx: "auto" }}
              error={meta.touched && meta.error ? true : false}
              helperText={meta.touched && meta.error ? meta.error : ""}
            />
          )}
        </Field>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          fullWidth
          onClick={() => formik.handleSubmit()}
        >
          Submit
        </Button>
      </Paper>
    </FormikProvider>
  );
};

export default Member;
