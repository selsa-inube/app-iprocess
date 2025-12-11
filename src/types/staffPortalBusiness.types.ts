interface IoptionsByStaffPortalBusinessManager {
  optionStaffId: string;
  staffPortalCatalogId: string;
  staffPortalId: string;
}

interface IStaffPortalByBusinessManager {
  abbreviatedName: string;
  businessManagerCode: string;
  descriptionUse: string;
  publicCode: string;
  staffPortalCatalogCode: string;
  staffPortalId: string;
  url: string;
  optionsByStaffPortalBusinessManager?: IoptionsByStaffPortalBusinessManager[];
}

interface IBusinessManagers {
  id: string;
  publicCode: string;
  language: string;
  abbreviatedName: string;
  description: string;
  urlBrand: string;
  urlLogo: string;
  customerId: string;
}

interface IBusinessUnitsPortalStaff {
  publicCode: string;
  languageId: string;
  abbreviatedName: string;
  descriptionUse: string;
  urlLogo: string;
  firstMonthOfFiscalYear?: string;
}

interface IOptionsByBusinessUnits {
  abbreviatedName: string;
  descriptionUse: string;
  optionStaffId: string;
  publicCode: string;
  iconReference: string;
  useCaseName?: string;
}

export type {
  IStaffPortalByBusinessManager,
  IBusinessManagers,
  IBusinessUnitsPortalStaff,
  IOptionsByBusinessUnits,
};
