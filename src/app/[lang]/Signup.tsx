// src/app/[lang]/ClientComponent.tsx
"use client";
import {
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
import { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import Input from "../components/inputs";
import CustomButton from "../components/buttons/CustomButton";
import ProgressDialog from "../components/tracking";
import Schema from "../schema";
import { setAuthEmail, setToken } from "@/utils/constant";
import { updateDns } from "@/lib/features/dns/dnsSlice";
import { handleDomains } from "@/lib/features/dns/action";

const Signup = ({ dict }: any) => {
  const dispatch: any = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show: any) => !show);

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

  return (
    <>
      <Grid container spacing={4} rowGap={2}>
        <Grid item xs={12} md={12} lg={12} sm={12} textAlign={"center"}>
          <Typography variant="h4" mt={4} gutterBottom>
            {dict.title}
          </Typography>
          <hr style={{ width: "42%", margin: "auto" }}></hr>
        </Grid>
      </Grid>

      <Formik
        initialValues={initialValue}
        enableReinitialize={true}
        validateOnChange={true}
        validationSchema={Schema.AddDomainForm(dict)}
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
                  <InputLabel required>Your Email</InputLabel>
                  <Input
                    focused={false}
                    name={"email"}
                    type={"text"}
                    placeholder={"e.g. mail@example.com"}
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
                  <InputLabel required>Your API Key</InputLabel>
                  <Input
                    focused={false}
                    name={"apiKey"}
                    type={showPassword ? "text" : "password"}
                    placeholder={
                      "Example: g789h67deep45a5544b7b0cupra4678987n22"
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
                  <InputLabel required>Domains</InputLabel>
                  <Input
                    name={"domains"}
                    type={"text"}
                    focused={false}
                    multiline={true}
                    placeholder={"Example: \ncloudflare.com\nfacebook.com"}
                    values={values.domains}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.domains) && errors.domains}
                    helperText={touched.domains && errors.domains}
                  />
                  <FormHelperText>
                    Write each domain on a new line
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} md={3.5} lg={3.5} sm={12}></Grid>
                <Grid item xs={12} md={3.5} lg={3.5} sm={12}></Grid>
                <Grid item xs={12} md={5} lg={5} sm={12}>
                  <InputLabel required>IP</InputLabel>
                  <Input
                    name={"ip"}
                    focused={false}
                    type={"text"}
                    placeholder={"Domains: 88.77.55.86"}
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
                      label="Delete Old DNS Records"
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
                      label="Proxied"
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
                      label="Clear Cache"
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
                      label="Disable IPv6"
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
                      label="Always Use HTTPS"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12} md={3.5} lg={3.5} sm={12}></Grid>
                <Grid item xs={12} md={3.5} lg={3.5} sm={12}></Grid>

                <Grid item xs={12} md={5} lg={5} sm={12}>
                  <CustomButton type="submit" buttonText="Submit" />
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
};

export default Signup;
