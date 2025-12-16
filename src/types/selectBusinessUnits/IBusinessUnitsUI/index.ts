import { IBusinessUnitstate } from "@pages/selectBusinessUnits/outlets/BusinessUnit/types";
import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortalBusiness.types";


interface IBusinessUnitsUI {
  businessUnits: IBusinessUnitsPortalStaff[];
  search: string;
  businessUnit: IBusinessUnitstate;
  screenMobile: boolean;
  screenTablet: boolean;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBussinessUnitChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  filterBusinessUnits: (
    businessUnits: IBusinessUnitsPortalStaff[],
    search: string,
  ) => IBusinessUnitsPortalStaff[];
  handleSubmit: () => void;
}

export type {IBusinessUnitsUI}