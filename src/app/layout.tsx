"use client";

import Header from "./header";
import Footer from "./footer";
import "./index.css";
import Toast from "./components/toast";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material/styles";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <title>Header</title>
        <meta name="cryptomus" content="7bc395c1" />
      </head>
      <body className="bg-color">
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Header />
            {children}
            <Footer />
            <Toast />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
