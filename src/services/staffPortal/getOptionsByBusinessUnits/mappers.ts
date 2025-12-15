import { IOptionsByBusinessUnits } from "@ptypes/staffPortalBusiness.types";

const mapOptionsByBusinessUnitsApiToEntity = (
  businessUnit: Record<string, string | number | object>
): IOptionsByBusinessUnits => {
const businessUnitData: IOptionsByBusinessUnits = {
    optionStaffId: String(businessUnit.optionStaffId),
    abbreviatedName: String(businessUnit.abbreviatedName),
    descriptionUse: String(businessUnit.descriptionUse),
    publicCode: String(businessUnit.publicCode),
    useCaseName: String(businessUnit.useCaseName),
    iconReference: String(businessUnit.iconReference),
  };
  return businessUnitData;
};

const mapOptionsByBusinessUnitsToEntities = (
  options: Record<string, string | number | object>[]
): IOptionsByBusinessUnits[] => {
  return options.map(mapOptionsByBusinessUnitsApiToEntity);
};
export {
  mapOptionsByBusinessUnitsToEntities,
  mapOptionsByBusinessUnitsApiToEntity,
};
