// src/app/[lang]/page.tsx
import ClientComponent from "./ClientComponent";
import { getDictionary } from "./dictionaries";
import Layout from "./layout";

export default async function Page({ params: { lang }, Children }: any) {
  const dict = await getDictionary(lang);
  return (
    <Layout lang={lang}>
      <ClientComponent dict={dict} lang={lang} />;
    </Layout>
  );
}
