import "styled-components";
import { ITheme } from "@ptypes/context/ITheme";

declare module "styled-components" {
  export interface DefaultTheme extends ITheme {}
}
