import { getDictionary } from "../dictionaries";
import Header from "../header";
import Login from "./login";

export default async function Page({ params: { lang }, Children }: any) {
  const dict = await getDictionary(lang);
  return (
    <>
      <Header t={dict} lang={lang} />
      <Login t={dict} lang={lang} />
    </>
  );
}
