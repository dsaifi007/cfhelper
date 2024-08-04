import { getDictionary } from "../dictionaries";
import Header from "../header";
import ResetPassword from "./resetPassword";

export default async function Page({ params: { lang }, Children }: any) {
  const dict = await getDictionary(lang);
  return (
    <>
      <Header t={dict} lang={lang} />
      <ResetPassword t={dict} lang={lang} />
    </>
  );
}
