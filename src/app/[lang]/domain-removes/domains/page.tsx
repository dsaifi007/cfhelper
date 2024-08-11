import { getDictionary } from "../../dictionaries";
import Header from "../../header";
import Domains from "./domains";

export default async function Page({ params: { lang }, Children }: any) {
  const dict = await getDictionary(lang);
  return (
    <>
      <Header t={dict} lang={lang} />
      <Domains t={dict} lang={lang} />
    </>
  );
}
