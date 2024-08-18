"use client";
import { Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import CustomButton from "../components/buttons/CustomButton";
import Input from "../components/inputs";
import ProgressDialog from "../components/tracking";
import Schema from "../../schema";
import { loginUser, resetPasswordAPI } from "@/lib/features/onboarding/action";
import Link from "next/link";

export default function ResetPassword({ t }: any) {
  const dispatch: any = useAppDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const searchParam = useSearchParams();
  const email = searchParam.get("email");
  const token = searchParam.get("token");

  let initialValue = {
    password: "",
    password_confirmation: "",
    token: token,
    email: email,
  };
  const handleClickShowPassword = () => setShowPassword((show: any) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show: any) => !show);

  return (
    <>
      <Grid container spacing={4} rowGap={2} mt={10}>
        <Grid item xs={12} md={12} lg={12} sm={12} textAlign={"center"}>
          <Typography variant="h4" mt={4} gutterBottom>
            {t.resetPassword}
          </Typography>
        </Grid>
      </Grid>

      <Formik
        initialValues={initialValue}
        enableReinitialize={true}
        validateOnChange={true}
        validationSchema={Schema.ResetPassword(t)}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(resetPasswordAPI(values, router));
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
              <Grid container spacing={4}>
                <Grid item xs={12} md={4.5} lg={4.5} sm={12}></Grid>
                <Grid item xs={12} md={3} lg={3} sm={12} mt={4}>
                  <Input
                    name={"password"}
                    focused={false}
                    type={showPassword ? "text" : "password"}
                    showPassword={showPassword}
                    handleClickShowPassword={handleClickShowPassword}
                    label={t.password}
                    isEndAdornment={true}
                    placeholder={t?.password}
                    values={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.password) && errors.password}
                    helperText={touched.password && errors.password}
                  />
                </Grid>
                <Grid item xs={12} md={4.5} lg={4.5} sm={12}></Grid>
                <Grid item xs={12} md={4.5} lg={4.5} sm={12}></Grid>
                <Grid item xs={12} md={3} lg={3} sm={12}>
                  <Input
                    name={"password_confirmation"}
                    focused={false}
                    type={showPassword1 ? "text" : "password"}
                    showPassword={showPassword1}
                    handleClickShowPassword={handleClickShowPassword1}
                    label={t.cpassword}
                    isEndAdornment={true}
                    placeholder={t?.cpassword}
                    values={values.password_confirmation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      Boolean(touched.password_confirmation) &&
                      errors.password_confirmation
                    }
                    helperText={
                      touched.password_confirmation &&
                      errors.password_confirmation
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4.5} lg={4.5} sm={12}></Grid>
                <Grid item xs={12} md={4.5} lg={4.5} sm={12}></Grid>
                <Grid item xs={12} md={3} lg={3} sm={12}>
                  <CustomButton
                    type="submit"
                    buttonText={t.loginT}
                    style={{
                      borderRadious: 1,
                      backgroundColor: "black",
                      width: "100%",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4.5} lg={4.5} sm={12}></Grid>

                <Grid item xs={12} md={4.5} lg={4.5} sm={12}></Grid>
                <Grid item xs={12} md={3} lg={3} sm={12}>
                  <Typography
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ color: "black" }}
                  >
                    {t.alreadyLogin}
                    &nbsp;
                    <Link href="/login">{t.loginT}</Link>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4.5} lg={4.5} sm={12}></Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
      <ProgressDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
