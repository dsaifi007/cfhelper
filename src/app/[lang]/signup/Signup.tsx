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
import { signupUser } from "@/lib/features/onboarding/action";

export default function Signup({ t }: any) {
  const dispatch: any = useAppDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);

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
                    type={"text"}
                    label={t.password}
                    placeholder={t?.password}
                    values={values.password}
                    onChange={handleChange}
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
