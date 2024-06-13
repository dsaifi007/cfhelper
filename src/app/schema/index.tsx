import * as Yup from "yup";
const WithdrawalForm = (e: any) => {
  return Yup.object().shape({
    fname: Yup.string()
      .trim()
      .required("First name is required")
      .max(30, "First name must be at most 30 characters")
      .min(2, "First name must be at least 2 characters"),
    lname: Yup.string()
      .trim()
      .required("Last name is required")
      .max(30, "Last name must be at most 30 characters")
      .min(2, "Last name must be at least 2 characters"),
    email: Yup.string().email().trim().required("Please provide an email"),
    account: Yup.string().trim().required(),
  });
};
const PayformForm = (e: any) => {
  return Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("Name is required")
      .max(30, "Name must be at most 30 characters")
      .min(2, "Name must be at least 2 characters"),
    phone: Yup.string()
      .trim()
      .required("Phone number is required")
      .max(30, "Phone number must be at most 30 characters")
      .min(8, "Phone number must be at least 8 characters"),
    email: Yup.string().email().trim().required("Please provide an email"),
  });
};

const ReceipintDetails = (e: any) => {
  return Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("Name is required")
      .max(30, "Name must be at most 30 characters")
      .min(2, "Name must be at least 2 characters"),
    account: Yup.string().trim().required("Account number is required").min(10),
  });
};
const Receipint = (e: any) => {
  return Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("First name is required")
      .max(30, "First name must be at most 30 characters")
      .min(2, "First name must be at least 2 characters"),
    lname: Yup.string()
      .trim()
      .required("Last name is required")
      .max(30, "Last name must be at most 30 characters")
      .min(2, "Last name must be at least 2 characters"),
    email: Yup.string().email().trim().required("Please provide an email"),
  });
};
const Schema = {
  WithdrawalForm,
  PayformForm,
  ReceipintDetails,
  Receipint,
};
export default Schema;
