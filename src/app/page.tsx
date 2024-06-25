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
import Input from "./components/inputs";
import CustomButton from "./components/buttons/CustomButton";
import Schema from "./schema";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { updateDns } from "@/lib/features/dns/dnsSlice";
import { updateGlobalLoader } from "../lib/features/loader/backdropSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getAccountID, handleDomains } from "@/lib/features/dns/action";
import Tracking from "./components/tracking";
import { setAuthEmail, setToken } from "@/utils/constant";
import ProgressDialog from "./components/tracking";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function Home() {
  const dispatch: any = useAppDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { apisStatus }: any = useAppSelector((state: any) => state.dnsSlice);
  const [showPassword, setShowPassword] = useState(false);
  //const [showPassword, setS] = useState<any>([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const handleClickShowPassword = () => setShowPassword((show: any) => !show);

  const fetchData = async ({ email, apiKey }: any) => {
    try {
      const res = await axios.post("/api", {
        email: email,
        apiKey: apiKey,
      });
      setData(res.data);
    } catch (error: any) {
      setError(error.message);
    }
  };
  console.log("data", data);
  // let initialValue = {
  //   email: "neelson8826@gmail.com",
  //   apiKey: "a4be316ee7a00ac0b9e080da7bc3eae745a01", //"27795ac70b1ba3626a4b11049ba8baac64361",
  //   domains: "www.com",
  //   ip: "12.12.12.12",
  //   dns: false,
  //   proxied: false,
  //   clearCache: false,
  //   ipv6: false,
  //   https: false,
  // };

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
      <Grid container>
        <Grid item xs={12} md={12} sm={12} lg={12} textAlign={"center"}>
          <Typography variant="h4" gutterBottom>
            Adding domains and DNS records in CloudFlare
          </Typography>
          <hr style={{ width: "45%", position: "relative", left: 60 }}></hr>
        </Grid>
      </Grid>

      <Formik
        initialValues={initialValue}
        enableReinitialize={true}
        validateOnChange={true}
        validationSchema={Schema.AddDomainForm}
        onSubmit={(values, { setSubmitting }) => {
          setOpen(true);
          setToken(values.apiKey);
          setAuthEmail(values.email);
          //router.push("/api");
          let domains = values.domains.split("\n");
          // fetchData(values);
          dispatch(
            updateDns({
              apisStatus: [],
              totalDomains: domains,
              formData: values,
            }),
          );
          dispatch(handleDomains(domains, values));

          // dispatch(
          //   updateDns({
          //     formData: values,
          //   }),
          // );
          //dispatch(getAccountID());
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
          setFieldValue,
          isValid,
          dirty,
        }) => {
          return (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              {" "}
              <Grid container rowGap={4}>
                <Grid item xs={4} md={4} sm={4} lg={4}></Grid>
                <Grid item xs={5} md={5} sm={5} lg={5}>
                  <InputLabel required>Your Email</InputLabel>
                  <Input
                    name={"email"}
                    type={"text"}
                    focused={false}
                    sizeval="medium"
                    placeholder={"e.g. mail@example.com"}
                    isShrink={true}
                    values={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email) && errors.email}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={3} md={3} sm={3} lg={3}></Grid>
                <Grid item xs={4} md={4} sm={4} lg={4}></Grid>
                <Grid item xs={5} md={5} sm={5} lg={5}>
                  <InputLabel required>Your api key</InputLabel>
                  <Input
                    name={"apiKey"}
                    type={showPassword ? "text" : "password"}
                    focused={false}
                    sizeval="medium"
                    placeholder={
                      "Example: g789h67deep45a5544b7b0cupra4678987n22"
                    }
                    handleClickShowPassword={handleClickShowPassword}
                    isEndAdornment={true}
                    isShrink={true}
                    values={values.apiKey}
                    showPassword={showPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.apiKey) && errors.apiKey}
                    helperText={touched.apiKey && errors.apiKey}
                  />
                </Grid>
                <Grid item xs={3} md={3} sm={3} lg={3}></Grid>

                <Grid item xs={4} md={4} sm={4} lg={4}></Grid>
                <Grid item xs={5} md={5} sm={5} lg={5}>
                  <InputLabel required>Domains</InputLabel>
                  <Input
                    name={"domains"}
                    type={"text"}
                    multiline={true}
                    focused={false}
                    sizeval="medium"
                    placeholder={"Example: cloudflare.com, facebook.com"}
                    isShrink={true}
                    values={values.domains}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.domains) && errors.domains}
                    helperText={touched.domains && errors.domains}
                  />

                  <FormHelperText id="component-helper-text">
                    Write each domain in new line
                  </FormHelperText>
                </Grid>
                <Grid item xs={3} md={3} sm={3} lg={3}></Grid>
                <Grid item xs={4} md={4} sm={4} lg={4}></Grid>
                <Grid item xs={5} md={5} sm={5} lg={5}>
                  <InputLabel required>IP</InputLabel>
                  <Input
                    name={"ip"}
                    type={"text"}
                    focused={false}
                    sizeval="medium"
                    placeholder={"Example: 88.77.55.86"}
                    isShrink={true}
                    values={values.ip}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.ip) && errors.ip}
                    helperText={touched.ip && errors.ip}
                  />
                </Grid>
                <Grid item xs={3} md={3} sm={3} lg={3}></Grid>

                <Grid item xs={4} md={4} sm={4} lg={4}></Grid>
                <Grid item xs={5} md={5} sm={5} lg={5}>
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
                <Grid item xs={3} md={3} sm={3} lg={3}></Grid>
                <Grid item xs={4} md={4} sm={4} lg={4}></Grid>
                <Grid
                  item
                  xs={8}
                  md={8}
                  sm={8}
                  lg={8}
                  justifyContent="flex-end"
                  alignItems="right"
                >
                  <CustomButton
                    type="submit"
                    // onPress={() => {}}
                    justifyContent="flex-end"
                    alignItems="right"
                    buttonText="Submit"
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
