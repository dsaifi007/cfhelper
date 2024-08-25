"use-client";
import * as Yup from "yup";
import { DOMAIN_REGEX, IPADDRESS_REGEX } from "../utils/constant";
const AddDomainForm = (t: any) => {
  return Yup.object().shape({
    email: Yup.string().email().trim().required(t?.emailRe),
    apiKey: Yup.string()
      .trim()
      .required(t?.apiKeyReq)
      .max(500, t?.apiKeyMust)
      .min(1, t?.apiKeyMin),
    domains: Yup.string()
      .trim()
      .required(t?.domainReq)
      .test("valid-domains", t?.validDomain, (value) => {
        if (!value) return false;
        const domains = value.split("\n").map((domain) => domain.trim());
        return domains.every((domain) => DOMAIN_REGEX.test(domain));
      }),
    //.matches(DOMAIN_REGEX, "Please provide a valid domain"),
    ip: Yup.string()
      .trim()
      .required(t?.IPAddresReq)
      .matches(IPADDRESS_REGEX, t?.validIp),
  });
};

const SignupForm = (t: any) => {
  return Yup.object().shape({
    email: Yup.string().email().trim().required(t.singupEmail),
    name: Yup.string().trim().required(t.nameR),
    password: Yup.string()
      .trim()
      .required(t?.passwordR)
      .min(8, t.passChar)
      .max(36, t.passmaxChar)
      .matches(/^(?=.*[A-Z])(?=.*\d).+$/, t.passV),
    terms: Yup.array()
      .of(Yup.string().required(t.acceptterms))
      .min(1, t.acceptterms)
      .required(t.acceptterms),
  });
};

const zoneList = (t: any) => {
  return Yup.object().shape({
    terms: Yup.array()
      .of(Yup.string().required(t.acceptterms))
      .min(1, t.acceptterms)
      .required(t.acceptterms),
  });
};

const LoginForm = (t: any) => {
  return Yup.object().shape({
    email: Yup.string().email().trim().required(t.singupEmail),
    password: Yup.string().trim().required(t?.passwordR),
  });
};
const ResetPassword = (t: any) => {
  return Yup.object().shape({
    password: Yup.string()
      .trim()
      .required(t?.passwordR)
      .min(8, t.passChar)
      .matches(/^(?=.*[A-Z])(?=.*\d).+$/, t.passV),
    password_confirmation: Yup.string()
      .required(t.cPassword)
      .oneOf([Yup.ref("password")], t.newPassText),
  });
};

const DomainRemoval = (t: any) => {
  return Yup.object().shape({
    email: Yup.string().email().trim().required(t?.emailRe),
    apiKey: Yup.string()
      .trim()
      .required(t?.apiKeyReq)
      .max(500, t?.apiKeyMust)
      .min(1, t?.apiKeyMin),
  });
};

const domainStatus = (t: any) => {
  return Yup.object().shape({
    domain: Yup.string()
      .trim()
      .required(t?.domainReq)
      .test("valid-domains", t.validDomain, (value) => {
        if (!value) return false;
        const domains = value.split("\n").map((domain) => domain.trim());
        return domains.every((domain) => DOMAIN_REGEX.test(domain));
      }),
  });
};
const Schema = {
  AddDomainForm,
  DomainRemoval,
  SignupForm,
  LoginForm,
  ResetPassword,
  zoneList,
  domainStatus,
};
export default Schema;
