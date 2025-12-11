import { useIAuth } from "@inube/iauth-react";
import { useEffect, useMemo, useState } from "react";
import { decrypt } from "@utils/encrypt";
import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortalBusiness.types";
import { IAppData } from "@context/AppContext/types";
import { useBusinessManagers } from "../useBusinessManagers";
import { usePortalData } from "../usePortalData";

const useValidatingLoginInformation = () => {
const { user, isLoading: isIAuthLoading } = useIAuth();

  const portalCode = decrypt(localStorage.getItem("portalCode") ?? "");
  const { portalData } = usePortalData(portalCode);
  const { businessManagersData } = useBusinessManagers(portalData);
  const [businessUnitSigla, setBusinessUnitSigla] = useState(
    localStorage.getItem("businessUnitSigla") ?? "",
  );
  const [businessUnitsToTheStaff, setBusinessUnitsToTheStaff] = useState<
    IBusinessUnitsPortalStaff[]
  >(() => {
    const savedBusinessUnits = localStorage.getItem("businessUnitsToTheStaff");
    return savedBusinessUnits ? JSON.parse(savedBusinessUnits) : [];
  });

  let businessUnitData: IBusinessUnitsPortalStaff =
    {} as IBusinessUnitsPortalStaff;
  try {
    businessUnitData = JSON.parse(
      businessUnitSigla || "{}",
    ) as IBusinessUnitsPortalStaff;
  } catch (error) {
    console.error("Error parsing businessUnitSigla:", error);
  }

  const [appData, setAppData] = useState<IAppData>({
    portal: {
      abbreviatedName: "",
      staffPortalCatalogId: "",
      businessManagerId: "",
      publicCode: "",
    },
    businessManager: {
      publicCode: "",
      abbreviatedName: "",
      urlBrand: "",
      urlLogo: "",
    },
    businessUnit: {
      publicCode: businessUnitData?.publicCode ?? "",
      abbreviatedName: businessUnitData?.abbreviatedName ?? "",
      languageId: businessUnitData?.languageId ?? "",
      urlLogo: businessUnitData?.urlLogo ?? "",
    },
    user: {
userAccount: user.id || "",
      userName: user.nickname || "",
      identificationDocumentNumber: user.id || "",
    },
  });
    useEffect(() => {
    if (!isIAuthLoading) {
      if (user) {
        setAppData((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            userAccount: user.id || "",
            userName: user.nickname || "",
            identificationDocumentNumber: user.id || "",
          },
        }));
      }
    }
  }, [user, isIAuthLoading]);

  useEffect(() => {
    if (!businessManagersData) return;

    setAppData((prev) => ({
      ...prev,
      portal: {
        ...prev.portal,
        abbreviatedName: portalData?.abbreviatedName ?? "",
        staffPortalCatalogCode: portalData?.staffPortalCatalogCode ?? "",
        businessManagerCode: portalData?.businessManagerCode ?? "",
        publicCode: portalData?.publicCode ?? "",
      },
      businessManager: {
        ...prev.businessManager,
        publicCode: businessManagersData.publicCode ?? "",
        abbreviatedName: businessManagersData.abbreviatedName ?? "",
        urlBrand: businessManagersData.urlBrand ?? "",
        urlLogo: businessManagersData.urlLogo ?? "",
      },
    }));
  }, [businessManagersData, portalData, portalCode]);
  useEffect(() => {
    if (!businessManagersData) return;

    if (
      businessManagersData.publicCode &&
      businessManagersData.publicCode.length > 0
    ) {
      setAppData((prev) => ({
        ...prev,
        businessManager: {
          ...prev.businessManager,
          publicCode: businessManagersData.publicCode,
          abbreviatedName: businessManagersData.abbreviatedName,
          urlBrand: businessManagersData.urlBrand,
          urlLogo: businessManagersData.urlLogo,
        },
      }));
    }
  }, [businessManagersData]);


  useEffect(() => {
    localStorage.setItem("businessUnitSigla", businessUnitSigla);

    if (businessUnitsToTheStaff && businessUnitSigla) {
      const businessUnit = JSON.parse(businessUnitSigla);

      setAppData((prev) => ({
        ...prev,
        businessUnit: {
          ...prev.businessUnit,
          abbreviatedName: businessUnit?.abbreviatedName,
          publicCode: businessUnit?.publicCode,
          languageId: businessUnit?.languageId,
          urlLogo: businessUnit?.urlLogo,
        },
      }));
    }
  }, [businessUnitSigla, businessUnitsToTheStaff]);

  useEffect(() => {
    localStorage.setItem(
      "businessUnitsToTheStaff",
      JSON.stringify(businessUnitsToTheStaff),
    );
  }, [businessUnitsToTheStaff]);

  const authAndPortalDataContainer = useMemo(
    () => ({
      appData,
      businessUnitSigla,
      businessUnitsToTheStaff,
      setAppData,
      setBusinessUnitSigla,
      setBusinessUnitsToTheStaff,
    }),
    [appData, businessUnitSigla, businessUnitsToTheStaff],
  );

  return { authAndPortalDataContainer };
};

export { useValidatingLoginInformation };
