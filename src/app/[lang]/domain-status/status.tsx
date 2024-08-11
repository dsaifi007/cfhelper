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

import { getDomainInfo, handleDomains } from "@/lib/features/dns/action";
import { updateDns } from "@/lib/features/dns/dnsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setAuthEmail, setToken } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CustomButton from "../components/buttons/CustomButton";
import Input from "../components/inputs";
import ProgressDialog from "../components/tracking";
import Schema from "../../schema";

export default function Sigmup({ t }: any) {
  const dispatch: any = useAppDispatch();
  const router = useRouter();

  let initialValue = {
    domain: "",
  };

  return (
    <>
      <Grid container spacing={4} rowGap={2}>
        <Grid item xs={12} md={12} lg={12} sm={12} textAlign={"center"}>
          <Typography variant="h4" mt={4} gutterBottom>
            {t.domainStatusinfo}
          </Typography>
          <hr style={{ width: "42%", margin: "auto" }}></hr>
        </Grid>
      </Grid>

      <Formik
        initialValues={initialValue}
        enableReinitialize={true}
        validateOnChange={true}
        validationSchema={Schema.domainStatus(t)}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(getDomainInfo(values, router));
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
                <Grid item xs={12} md={4} lg={4} sm={12}></Grid>
                <Grid item xs={12} md={4} lg={4} sm={12} mt={4}>
                  <InputLabel required>{t.domainName}</InputLabel>
                  <Input
                    focused={false}
                    name={"domain"}
                    type={"text"}
                    placeholder={t?.exampledomain}
                    values={values.domain}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.domain) && errors.domain}
                    helperText={touched.domain && errors.domain}
                  />
                </Grid>
                <Grid item xs={12} md={4} lg={4} sm={12}></Grid>
                <Grid item xs={12} md={4} lg={4} sm={12}></Grid>

                <Grid item xs={12} md={4} lg={4} sm={12}>
                  <CustomButton
                    type="submit"
                    buttonText={t.scan}
                    style={{ borderRadius: 5, backgroundColor: "black" }}
                  />
                </Grid>
                <Grid item xs={12} md={4} lg={4} sm={12}></Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
