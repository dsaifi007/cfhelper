import { getDictionary } from "../dictionaries";
import Header from "../header";
import ForgotPassword from "./forgotPassword";

export default async function Page({ params: { lang }, Children }: any) {
  const dict = await getDictionary(lang);
  return (
    <>
      <Header t={dict} lang={lang} />
      <ForgotPassword t={dict} lang={lang} />
    </>
  );
}
