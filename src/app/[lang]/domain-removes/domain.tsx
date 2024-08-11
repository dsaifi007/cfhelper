"use client";
import {
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  InputLabel,
  Switch,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";

import { getAllZones, handleDomains } from "@/lib/features/dns/action";
import { updateDns } from "@/lib/features/dns/dnsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setAuthEmail, setToken } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CustomButton from "../components/buttons/CustomButton";
import Input from "../components/inputs";
import ProgressDialog from "../components/tracking";
import Schema from "../../schema";
import { Alert } from "@/utils/Alert";

export default function Domain({ t }: any) {
  const dispatch: any = useAppDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show: any) => !show);

  let initialValue = {
    email: "",
    apiKey: "",
  };

  return (
    <>
      <Grid container spacing={4} rowGap={2}>
        <Grid item xs={12} md={12} lg={12} sm={12} textAlign={"center"}>
          <Typography variant="h4" mt={4} gutterBottom>
            {t.massRemoveText}
          </Typography>
          <hr style={{ width: "42%", margin: "auto" }}></hr>
        </Grid>
      </Grid>

      <Formik
        initialValues={initialValue}
        enableReinitialize={true}
        validateOnChange={true}
        validationSchema={Schema.DomainRemoval(t)}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(
            updateDns({
              formData: values,
            }),
          );
          dispatch(getAllZones(values, router));
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
                <Grid item xs={12} md={3.5} lg={3.5} sm={12}></Grid>
                <Grid item xs={12} md={5} lg={5} sm={12} mt={4}>
                  <InputLabel required>{t?.youremail}</InputLabel>
                  <Input
                    focused={false}
                    name={"email"}
                    type={"text"}
                    placeholder={t?.exampleEmail}
                    values={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email) && errors.email}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12} md={3.5} lg={3.5} sm={12}></Grid>

                <Grid item xs={12} md={3.5} lg={3.5} sm={12}></Grid>
                <Grid item xs={12} md={5} lg={5} sm={12}>
                  <InputLabel required>{t?.apiKey}</InputLabel>
                  <Input
                    focused={false}
                    name={"apiKey"}
                    type={showPassword ? "text" : "password"}
                    showPassword={showPassword}
                    placeholder={t?.exampleKey}
                    handleClickShowPassword={handleClickShowPassword}
                    isEndAdornment={true}
                    values={values.apiKey}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.apiKey) && errors.apiKey}
                    helperText={touched.apiKey && errors.apiKey}
                  />
                </Grid>
                <Grid item xs={12} md={3.5} lg={3.5} sm={12}></Grid>

                <Grid item xs={12} md={3.5} lg={3.5} sm={12}></Grid>
                <Grid item xs={12} md={5} lg={5} sm={12}>
                  <CustomButton
                    type="submit"
                    buttonText={t.next}
                    style={{ borderRadius: 5, backgroundColor: "black" }}
                  />
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
      <ProgressDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
