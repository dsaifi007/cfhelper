"use client";

import Header from "./header";
import Footer from "./footer";
import "./index.css";
import Toast from "./components/toast";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "../lib/store";
import GlobalLoader from "./components/backdrop";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <title>CFH</title>
        <link rel="icon" href="/img/favicon.ico" />
        <meta name="cryptomus" content="7bc395c1" />
      </head>
      <body className="bg-color">
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <Header />
              <GlobalLoader />
              {children}
              <Footer />
              <Toast />
            </Provider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
