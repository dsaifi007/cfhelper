"use client";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  InputLabel,
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
import {
  loginUser,
  sendLinkForgotPaasword,
} from "@/lib/features/onboarding/action";
import Link from "next/link";

export default function ForgotPassword({ t }: any) {
  const dispatch: any = useAppDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { apisStatus }: any = useAppSelector((state: any) => state.dnsSlice);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const handleClickShowPassword = () => setShowPassword((show: any) => !show);

  useEffect(() => {}, [t]);
  let initialValue = {
    email: "",
    password: "Test@1234",
  };

  return (
    <>
      <Grid container spacing={4} rowGap={2} mt={10}>
        <Grid item xs={12} md={12} lg={12} sm={12} textAlign={"center"}>
          <Typography variant="h4" mt={4} gutterBottom>
            {t?.loginText}
          </Typography>
        </Grid>
      </Grid>

      <Formik
        initialValues={initialValue}
        enableReinitialize={true}
        validateOnChange={true}
        validationSchema={Schema.LoginForm(t)}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(sendLinkForgotPaasword(values, router));
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
