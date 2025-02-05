"use client";
import Footer from "../footer";
import "../index.css";
import Toast from "./components/toast";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "../../lib/store";
import GlobalLoader from "./components/backdrop";
import Header from "./headers/page";
import TopHeader from "./headers/page";
const RootLayout = ({ children, lang }: any) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <GlobalLoader />
          {/* <Header /> */}
          {children}
          <Footer />
          <Toast />
        </Provider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default RootLayout;
