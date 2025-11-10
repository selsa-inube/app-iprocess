import { IAppData } from "@context/AppContext/types";
import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortalBusiness.types";


interface IAuthAndPortalData {
    appData: IAppData;
    businessUnitSigla: string;
    businessUnitsToTheStaff: IBusinessUnitsPortalStaff[];
    setAppData: React.Dispatch<React.SetStateAction<IAppData>>;
    setBusinessUnitSigla: React.Dispatch<React.SetStateAction<string>>;
    setBusinessUnitsToTheStaff: React.Dispatch<
      React.SetStateAction<IBusinessUnitsPortalStaff[]>
    >;
}

export type { IAuthAndPortalData };