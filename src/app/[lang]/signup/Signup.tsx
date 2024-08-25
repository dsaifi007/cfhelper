"use client";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  InputLabel,
  LinearProgress,
  Switch,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";

import { handleDomains } from "@/lib/features/dns/action";
import { updateDns } from "@/lib/features/dns/dnsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setAuthEmail, setToken } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CustomButton from "../components/buttons/CustomButton";
import Input from "../components/inputs";
import ProgressDialog from "../components/tracking";
import Schema from "../../schema";
import { signupUser } from "@/lib/features/onboarding/action";

export default function Signup({ t }: any) {
  const dispatch: any = useAppDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [progress, setProgress] = useState(0);
  const handleClickShowPassword = () => setShowPassword((show: any) => !show);

  useEffect(() => {}, [t]);
  let initialValue = {
    email: "",
    name: "", //"27795ac70b1ba3626a4b11049ba8baac64361",
    password: "",
    terms: [],
  };

  return (
    <>
      <Grid container spacing={4} rowGap={2}>
        <Grid item xs={12} md={12} lg={12} sm={12} textAlign={"center"}>
          <Typography variant="h4" mt={4} gutterBottom>
            {t?.joinCFhelper}
          </Typography>
        </Grid>
      </Grid>

      <Formik
        initialValues={initialValue}
        enableReinitialize={true}
        validateOnChange={true}
        validationSchema={Schema.SignupForm(t)}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(signupUser(values, router));
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
        }) => {
          console.log("Error", errors);
          return (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <Grid container spacing={2.5}>
                <Grid item xs={12} md={4.5} lg={4.5} sm={12}></Grid>
                <Grid item xs={12} md={3} lg={3} sm={12} mt={4}>
                  <Input
                    focused={false}
                    name={"email"}
                    type={"text"}
                    label={t.email}
                    placeholder={t.email}
                    values={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email) && errors.email}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12} md={4.5} lg={4.5} sm={12}></Grid>

                <Grid item xs={12} md={4.5} lg={4.5} sm={12}></Grid>
                <Grid item xs={12} md={3} lg={3} sm={12}>
                  <Input
                    focused={false}
                    name={"name"}
                    type={"text"}
                    label={t.name}
                    placeholder={t.name}
                    isEndAdornment={false}
                    values={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.name) && errors.name}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={12} md={4.5} lg={4.5} sm={12}></Grid>
                <Grid item xs={12} md={4.5} lg={4.5} sm={12}></Grid>
                <Grid item xs={12} md={3} lg={3} sm={12}>
                  <Input
                    name={"password"}
                    focused={false}
                    label={t.password}
                    placeholder={t?.password}
                    values={values.password}
                    onChange={(e: any) => {
                      if (e.target.value.length < 9) {
                        setProgress(e.target.value.length);
                      }
                      handleChange(e);
                    }}
                    type={showPassword ? "text" : "password"}
                    handleClickShowPassword={handleClickShowPassword}
                    isEndAdornment={true}
                    //setProgress
                    onBlur={handleBlur}
                    error={Boolean(touched.password) && errors.password}
                    helperText={touched.password && errors.password}
                  />

                  {/* <p
                    style={{ paddingTop: "25px" }}
                    className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeSmall MuiFormHelperText-contained mui-t5hat3"
                  >
                    {t.passValid}
                  </p> */}
                  <LinearProgress
                    variant="determinate"
                    value={(progress / 8) * 100}
                    // color={
                    //   !(touched.password && errors.password)
                    //     ? "success"
                    //     : "error"
                    // }
                    color={
                      errors.password ? "error" : "success" // Red color for error, green for success
                    }
                    sx={{ mt: 5, height: 6 }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 1,
                    }}
                  >
                    <Typography variant="body2" color="textSecondary">
                      {t.passwT}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {values.password.length}/8
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4.5} lg={4.5} sm={12}></Grid>

                <Grid item xs={12} md={4.5} lg={4.5} sm={12}></Grid>
                <Grid item xs={12} md={3} lg={3} sm={12}>
                  <FormControl
                    required
                    error={Boolean(touched.terms) && Boolean(errors.password)}
                    component="fieldset"
                  >
                    <FormGroup aria-label="position" row>
                      <FormControlLabel
                        value="terms"
                        name="terms"
                        checked={values.terms.length > 0}
                        onChange={handleChange}
                        control={<Checkbox />}
                        label={t.terms}
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <FormHelperText>
                      {touched.terms && errors.terms}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4.5} lg={4.5} sm={12}></Grid>
                <Grid item xs={12} md={4.5} lg={4.5} sm={12}></Grid>
                <Grid item xs={12} md={5} lg={5} sm={12}>
                  <CustomButton
                    type="submit"
                    buttonText={t.createaccount}
                    style={{
                      borderRadious: 1,
                      backgroundColor: "black",
                      width: "60%",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3.5} lg={3.5} sm={12}></Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
      <ProgressDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
