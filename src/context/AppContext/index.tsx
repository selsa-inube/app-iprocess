import { useValidatingLoginInformation } from "@hooks/useValidatingLoginInformation";
import { IAuthAndPortalData } from "@ptypes/authAndPortalDataProvider/IAuthAndPortalData";
import { createContext } from "react";


const AuthAndPortalData = createContext<IAuthAndPortalData>(
  {} as IAuthAndPortalData,
);
interface IAuthAndPortalDataProvider {
  children: React.ReactNode;
}

function AuthAndPortalDataProvider(props: IAuthAndPortalDataProvider) {
  const { children } = props;
  const { authAndPortalDataContainer } = useValidatingLoginInformation();
  return (
    <AuthAndPortalData.Provider value={authAndPortalDataContainer}>
      {children}
    </AuthAndPortalData.Provider>
  );
}

export { AuthAndPortalData as AppContext, AuthAndPortalDataProvider as AppContextProvider };
export type { IAuthAndPortalDataProvider };
