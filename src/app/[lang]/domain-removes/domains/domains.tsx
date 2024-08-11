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
import Listing from "../../components/list";
import CustomButton from "../../components/buttons/CustomButton";
import { Form, Formik } from "formik";
import Schema from "@/app/schema";
import { useRouter } from "next/navigation";
import { removelDomains } from "@/lib/features/dns/action";
import { useAppDispatch } from "@/lib/hooks";
import { Alert } from "@/utils/Alert";
const Domains = ({ t }: any) => {
  const dispatch: any = useAppDispatch();
  const router = useRouter();
  let initialValue = {
    terms: [],
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
        validationSchema={Schema.zoneList(t)}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(removelDomains());
          Alert(1, t.success);
          router.push("/domain-removes");
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
                  <Listing />
                </Grid>
                <Grid item xs={12} md={3.5} lg={3.5} sm={12}></Grid>

                <Grid item xs={12} md={3.5} lg={3.5} sm={12}></Grid>
                <Grid item xs={12} md={8} lg={8} sm={12}>
                  <FormControl
                    required
                    error={Boolean(touched.terms) && Boolean(errors.terms)}
                    component="fieldset"
                  >
                    <FormGroup aria-label="position" row>
                      <FormControlLabel
                        value="terms"
                        name="terms"
                        checked={values.terms.length > 0}
                        onChange={handleChange}
                        control={<Checkbox />}
                        label={t.termsDomain}
                        labelPlacement="end"
                      />
                    </FormGroup>
                    <FormHelperText>
                      {touched.terms && errors.terms}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={3.5} lg={3.5} sm={12}></Grid>
                <Grid item xs={12} md={5} lg={5} sm={12}>
                  <CustomButton
                    type="submit"
                    buttonText={t.remove}
                    style={{ borderRadius: 5, backgroundColor: "black" }}
                  />
                </Grid>
                <Grid item xs={12} md={3.5} lg={3.5} sm={12}></Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
export default Domains;
