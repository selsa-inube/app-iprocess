import { IFullscreenNav } from "@inubekit/inubekit";

import { IAppData } from "@context/AppContext/types";
import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortalBusiness.types";
import { ICardData } from "../ICardData";

interface IHomeUI {
  appData: IAppData;
  businessUnitChangeRef: React.RefObject<HTMLDivElement | null>;
  businessUnitsToTheStaff: IBusinessUnitsPortalStaff[];
  collapse: boolean;
  collapseMenuRef: React.RefObject<HTMLDivElement | null>;
  selectedClient: string;
  username: string;
  screenMobile: boolean;
  screenTablet: boolean;
  screenTabletHeader: boolean;
  dataExists: boolean;
  padding: string;
  optionsHeader: {
    nav: IFullscreenNav;
    breakpoint?: string;
  };
  hasMultipleBusinessUnits: boolean;
  handleLogoClick: (businessUnit: IBusinessUnitsPortalStaff) => void;
  onlogout: () => void;
  setCollapse: (value: boolean) => void;
  loading: boolean;
  data: ICardData[];
}

export type { IHomeUI };
