import { useBusinessUnits } from "@hooks/selectBusinessUnits/useBusinessUnits";
import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortalBusiness.types";
import { BusinessUnitsUI } from "./interface";

interface IBusinessUnits {
  businessUnits: IBusinessUnitsPortalStaff[];
}

const BusinessUnits=(props: IBusinessUnits)=> {
  const { businessUnits } = props;

  const {
    search,
    businessUnitLocal,
    screenMobile,
    screenTablet,
    handleSearchChange,
    handleChange,
    handleSubmit,
    filterBusinessUnits,
  } = useBusinessUnits(businessUnits);

  return (
    <BusinessUnitsUI
      businessUnits={businessUnits}
      search={search}
      businessUnit={businessUnitLocal}
      handleSearchChange={handleSearchChange}
      handleBussinessUnitChange={handleChange}
      filterBusinessUnits={filterBusinessUnits}
      handleSubmit={handleSubmit}
      screenMobile={screenMobile}
      screenTablet={screenTablet}
    />
  );
}

export { BusinessUnits };
