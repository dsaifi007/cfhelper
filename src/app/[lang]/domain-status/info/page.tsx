import { getDictionary } from "../../dictionaries";
import Header from "../../header";
import Info from "./info";

export default async function Page({ params: { lang }, Children }: any) {
  const dict = await getDictionary(lang);
  return (
    <>
      <Header t={dict} lang={lang} />
      <Info t={dict} lang={lang} />
    </>
  );
}
