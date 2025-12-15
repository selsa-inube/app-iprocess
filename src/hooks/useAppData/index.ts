
import { usePortalData } from "../usePortalData";
import { useBusinessManagers } from "../useBusinessManagers";
import { useAuthRedirect } from "../authentication/useAuthRedirect";

const useAppData = (
  portalCode: string | null,
) => {


  let hasError = false;
  let isLoading = false;
  let isAuthenticated = true;
  let errorCode = 0;

    const {
      portalData,
      hasError: portalError,
      errorCode: errorCodePortal,
    } = usePortalData(portalCode);

    const {
      businessManagersData,
      hasError: businessError,
      errorCode: errorCodeBusiness,
    } = useBusinessManagers(portalData);

    const {
      hasError: authError,
      isLoading: authLoading,
      isAuthenticated: authAuthenticated,
      errorCode: errorCodeAuth,
    } = useAuthRedirect(portalData, businessManagersData, portalCode);

    hasError = portalError || businessError || authError;
    errorCode = errorCodePortal || errorCodeBusiness || errorCodeAuth;
    isLoading = authLoading;
    isAuthenticated = authAuthenticated;
  

  return { hasError, isLoading, isAuthenticated, errorCode };
};

export { useAppData };
