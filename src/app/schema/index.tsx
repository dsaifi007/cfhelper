import * as Yup from "yup";
import { DOMAIN_REGEX, IPADDRESS_REGEX } from "../utils/constant";
const AddDomainForm = (e: any) => {
  return Yup.object().shape({
    email: Yup.string()
      .email()
      .trim()
      .required("Please enter your CloudFlare mail"),
    apiKey: Yup.string()
      .trim()
      .required("API Global Key is required field”")
      .max(500, "API Global Key must be at most 500 characters")
      .min(1, "API Global Key must be at least 1 characters"),
    domains: Yup.string()
      .trim()
      .required("Domain is required field")
      .test(
        "valid-domains",
        "Please provide valid domains, each starting from a new line",
        (value) => {
          if (!value) return false;
          const domains = value.split("\n").map((domain) => domain.trim());
          return domains.every((domain) => DOMAIN_REGEX.test(domain));
        },
      ),
    //.matches(DOMAIN_REGEX, "Please provide a valid domain"),
    ip: Yup.string()
      .trim()
      .required("Please enter the IP address of the server")
      .matches(
        IPADDRESS_REGEX,
        "Please enter the Valid IP address of the server",
      ),
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
  AddDomainForm,
  PayformForm,
  ReceipintDetails,
  Receipint,
};
export default Schema;
