import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import App from "./App";

import { ThemeProvider } from "@emotion/react";
import { DarkTheme, LightTheme } from "./style/theme";

import { Provider } from "react-redux";
import store from "./store";

import { ThemeProviderCustom, useThemeContext } from "./ThemeContext";

const Root = () => {
  const { isDarkMode } = useThemeContext();

  return (
    <ThemeProvider theme={isDarkMode ? DarkTheme : LightTheme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProviderCustom>
      <Root />
    </ThemeProviderCustom>
  </React.StrictMode>
);
