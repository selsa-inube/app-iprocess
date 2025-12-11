import { RouterProvider } from "react-router-dom";

import { FlagProvider } from "@inubekit/inubekit";
import { ErrorPage } from "@components/layout/ErrorPage";
import { GlobalStyles } from "./styles/global";
import { AppContextProvider } from "./context/AppContext";
import { useAppData } from "./hooks/useAppData";
import { mainNavigation } from "./routes/mainNavigation";
import { AuthWrapper } from "./pages/authWrapper";
import { ThemeProviderWrapper } from "./context/theme";

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const portalCode = params.get("portal");

const AppContent = () => {
  const { hasError, isLoading, isAuthenticated, errorCode } =
    useAppData(portalCode);

  if (isLoading) {
    return null;
  }

  if (hasError && !isAuthenticated) {
    return <ErrorPage errorCode={errorCode} />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <GlobalStyles />
      <ThemeProviderWrapper>
        <FlagProvider>
          <AppContextProvider>
            <RouterProvider router={mainNavigation} />
          </AppContextProvider>
        </FlagProvider>
      </ThemeProviderWrapper>
    </>
  );
};
const App = () => {
  return (
    <AuthWrapper>
      <AppContent />
    </AuthWrapper>
  );
};
export default App;
