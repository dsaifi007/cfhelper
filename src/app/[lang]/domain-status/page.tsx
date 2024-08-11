import { getDictionary } from "../dictionaries";
import Header from "../header";
import Status from "./status";

export default async function Page({ params: { lang }, Children }: any) {
  const dict = await getDictionary(lang);
  return (
    <>
      <Header t={dict} lang={lang} />
      <Status t={dict} lang={lang} />
    </>
  );
}
