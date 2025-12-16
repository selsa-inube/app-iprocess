import { IAppData } from "@context/AppContext/types";

interface ISelectBusinessUnitsUI {
  appData: IAppData;
  screenTablet: boolean;
  screenDesktop: boolean;
  imageWidth: () => string;
}

export type { ISelectBusinessUnitsUI };