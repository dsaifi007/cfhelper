import Signup from "./Signup";
import { getDictionary } from "./dictionaries";
import Header from "./header";

export default async function Page({ params: { lang }, Children }: any) {
  const dict = await getDictionary(lang);
  return (
    <>
      <Header t={dict} lang={lang} />
      <Signup t={dict} lang={lang} />
    </>
  );
}
