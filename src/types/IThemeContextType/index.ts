import { Dispatch, SetStateAction } from "react";
import { tokensWithReference } from "@design/tokens/tokensWithReference";


type ThemeName = keyof typeof tokensWithReference;

interface IThemeContextType {
  themeName: ThemeName;
  setThemeName: Dispatch<SetStateAction<ThemeName>>;
}

export type {IThemeContextType, ThemeName}