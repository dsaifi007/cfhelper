"use client";
import {
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  Switch,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import Input from "./components/inputs";

export default function Home() {
  let initialValue = { email: "", apiKey: "", domains: "", ip: "" };
  return (
    <>
      <Grid container m={4} pl={4}>
        <Grid item xs={12} md={12} sm={12} lg={12} textAlign={"center"}>
          <Typography variant="h4" gutterBottom>
            Adding domains and DNS records in CloudFlare
          </Typography>
          <hr style={{ width: "39%" }}></hr>
        </Grid>
      </Grid>

      <Formik
        initialValues={initialValue}
        enableReinitialize={true}
        validateOnChange={true}
        //validationSchema={Schema.Deals(t)}
        onSubmit={(values, { setSubmitting }) => {}}
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
                    isRequired
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
                    type={"text"}
                    focused={false}
                    sizeval="medium"
                    placeholder={
                      "Example: g789h67deep45a5544b7b0cupra4678987n22"
                    }
                    isRequired
                    isShrink={true}
                    values={values.apiKey}
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
                    focused={false}
                    sizeval="medium"
                    placeholder={"Example: cloudflare.com, cloudflare.com"}
                    isRequired
                    isShrink={true}
                    values={values.domains}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.domains) && errors.domains}
                    helperText={touched.domains && errors.domains}
                  />
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
                    isRequired
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
                          checked={false}
                          onChange={handleChange}
                          name="gilad"
                        />
                      }
                      label="Delete Old DNS Records"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={false}
                          onChange={handleChange}
                          name="jason"
                        />
                      }
                      label="Proxied"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={false}
                          onChange={handleChange}
                          name="antoine"
                        />
                      }
                      label="Clear Cache"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={false}
                          onChange={handleChange}
                          name="antoine"
                        />
                      }
                      label="Disable IPv6"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={false}
                          onChange={handleChange}
                          name="antoine"
                        />
                      }
                      label="Always Use HTTPS"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={3} md={3} sm={3} lg={3}></Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
