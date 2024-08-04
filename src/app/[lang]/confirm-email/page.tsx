import { getDictionary } from "../dictionaries";
import Header from "../header";
import Confirm from "./confirm";

export default async function Page({ params: { lang }, Children }: any) {
  const dict = await getDictionary(lang);
  return (
    <>
      <Header t={dict} lang={lang} />
      <Confirm t={dict} lang={lang} />
    </>
  );
}
