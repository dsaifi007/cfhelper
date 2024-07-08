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


const Schema = {
  AddDomainForm,

};
export default Schema;
