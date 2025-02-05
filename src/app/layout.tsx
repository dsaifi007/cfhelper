import Footer from "./footer";
import "./index.css";
import Toast from "./[lang]/components/toast";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "../lib/store";
import GlobalLoader from "./[lang]/components/backdrop";
import Header from "./[lang]/header";
export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  return (
    <html lang={params.lang}>
      <head>
        <title>CFH</title>
        <link rel="icon" href="/img/favicon.ico" />
        <meta name="cryptomus" content="7bc395c1" />
      </head>
      <body className="bg-color">{children}</body>
    </html>
  );
}
