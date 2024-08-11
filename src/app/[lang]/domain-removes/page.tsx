import { getDictionary } from "../dictionaries";
import Header from "../header";
import Domain from "./domain";

export default async function Page({ params: { lang }, Children }: any) {
  const dict = await getDictionary(lang);
  return (
    <>
      <Header t={dict} lang={lang} />
      <Domain t={dict} lang={lang} />
    </>
  );
}
