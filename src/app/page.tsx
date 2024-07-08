"use client";
import {
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  InputLabel,
  Switch,
  Typography
} from "@mui/material";
import { Form, Formik } from "formik";

import { handleDomains } from "@/lib/features/dns/action";
import { updateDns } from "@/lib/features/dns/dnsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setAuthEmail, setToken } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CustomButton from "./components/buttons/CustomButton";
import Input from "./components/inputs";
import ProgressDialog from "./components/tracking";
import UseTranslation from "./hooks/useTranslation";
import Schema from "./schema";

export default function Home() {
  const t = UseTranslation();
  const dispatch: any = useAppDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { apisStatus }: any = useAppSelector((state: any) => state.dnsSlice);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const handleClickShowPassword = () => setShowPassword((show: any) => !show);




  useEffect(() => { }, [t])
  let initialValue = {
    email: "",
    apiKey: "", //"27795ac70b1ba3626a4b11049ba8baac64361",
    domains: "",
    ip: "",
    dns: false,
    proxied: false,
    clearCache: false,
    ipv6: false,
    https: false,
  };

  // let initialValue = {
  //   email: "mifipo4963@kinsef.com",
  //   apiKey: "d1e9601300cf18aafadf6c8e2fc4ac552bf19",
  //   domains: "testssss.com",
  //   ip: "12.12.12.15",
  //   dns: false,
  //   proxied: false,
  //   clearCache: false,
  //   ipv6: false,
  //   https: false,
  // };

  return (
    < >
      <Grid container spacing={4} rowGap={2} >
        <Grid item xs={12} md={12} lg={12} sm={12} textAlign={"center"}>
          <Typography variant="h4" mt={4} gutterBottom>
            {t?.addDomainText}
          </Typography>
          <hr style={{ width: "42%", margin: "auto" }}></hr>
        </Grid>
      </Grid>

      <Formik
        initialValues={initialValue}
        enableReinitialize={true}
        validateOnChange={true}
        validationSchema={Schema.AddDomainForm(t)}
        onSubmit={(values, { setSubmitting }) => {
          setOpen(true);
          setToken(values.apiKey);
          setAuthEmail(values.email);
          let domains = values.domains.split("\n");
          dispatch(
            updateDns({
              apisStatus: [],
              totalDomains: domains,
              formData: values,
            }),
          );

          dispatch(handleDomains(domains, values));
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
                    placeholder={
                      t?.exampleKey
                    }
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
                  <InputLabel required>{t?.domain}</InputLabel>
                  <Input
                    name={"domains"}
                    type={"text"}
                    focused={false}
                    multiline={true}
                    placeholder={t?.exampleDomain}
                    values={values.domains}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  // error={Boolean(touched.domains) && errors.domains}
                  // helperText={touched.domains && errors.domains}
                  />
                  <FormHelperText>
                    {t?.eachDomain}
                  </FormHelperText>
                  {errors.domains && touched.domains && (
                    <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeSmall MuiFormHelperText-contained mui-t5hat3" style={{ color: "#d32f2f" }}>{`${errors?.domains}`}</p>


                  )}
                </Grid>
                <Grid item xs={12} md={3.5} lg={3.5} sm={12}></Grid>
                <Grid item xs={12} md={3.5} lg={3.5} sm={12}></Grid>
                <Grid item xs={12} md={5} lg={5} sm={12}>
                  <InputLabel required>{t?.IP}</InputLabel>
                  <Input
                    name={"ip"}
                    focused={false}
                    type={"text"}
                    placeholder={t?.domainIP}
                    values={values.ip}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.ip) && errors.ip}
                    helperText={touched.ip && errors.ip}
                  />
                </Grid>
                <Grid item xs={12} md={3.5} lg={3.5} sm={12}></Grid>
                <Grid item xs={12} md={3.5} lg={3.5} sm={12}></Grid>
                <Grid item xs={12} md={5} lg={5} sm={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={values.dns}
                          value={values.dns}
                          onChange={handleChange}
                          name="dns"
                        />
                      }
                      label={t?.deleteOldDns}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={values.proxied}
                          value={values.proxied}
                          onChange={handleChange}
                          name="proxied"
                        />
                      }
                      label={t?.proxied}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={values.clearCache}
                          value={values.clearCache}
                          onChange={handleChange}
                          name="clearCache"
                        />
                      }
                      label={t?.clearcached}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={values.ipv6}
                          value={values.ipv6}
                          onChange={handleChange}
                          name="ipv6"
                        />
                      }
                      label={t?.disabledIp6}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={values.https}
                          value={values.https}
                          onChange={handleChange}
                          name="https"
                        />
                      }
                      label={t?.alwaysHttp}
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12} md={3.5} lg={3.5} sm={12}></Grid>
                <Grid item xs={12} md={3.5} lg={3.5} sm={12}></Grid>

                <Grid item xs={12} md={5} lg={5} sm={12}>
                  <CustomButton type="submit" buttonText={t?.submit} />
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
