"use client";

import Header from "./header";
import Footer from "./footer";
import "./index.css";
import Toast from "./components/toast";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "../lib/store";
import GlobalLoader from "./components/backdrop";

const App = ({ children }: any) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Header />
        <GlobalLoader />
        {children}
        <Footer />
        <Toast />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
