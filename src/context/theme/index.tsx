import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { inube } from "@inubekit/inubekit";
import { tokensWithReference } from "@design/tokens/tokensWithReference";

import { IThemeProviderWrapper } from "@ptypes/IThemeProviderWrapper";
import { ThemeName } from "@ptypes/IThemeContextType";
import { ITheme } from "@ptypes/context/ITheme";
import { ThemeContext} from "./themeContext";

const ThemeProviderWrapper = ({ children }: IThemeProviderWrapper) => {
  const savedTheme =
    (localStorage.getItem("themeName") as ThemeName) || "sistemasenlinea";
  const [themeName, setThemeName] = useState<ThemeName>(savedTheme);

  useEffect(() => {
    localStorage.setItem("themeName", themeName);
  }, [themeName]);

  const theme = {
    ...tokensWithReference[themeName],
    ...inube,
  } as ITheme;

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeProviderWrapper };
