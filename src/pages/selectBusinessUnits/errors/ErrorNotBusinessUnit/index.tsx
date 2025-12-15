import { useIAuth } from "@inube/iauth-react";
import { ErrorPage } from "@components/layout/ErrorPage";
import { useClearLocalStorage } from "@hooks/authentication/useClearLocalStorage";
import { enviroment } from "@config/environment";

function ErrorNotBusinessUnit() {
  const { logout } = useIAuth();

  useClearLocalStorage();

  const handlelogout = () => {
    logout({ logoutParams: { returnTo: enviroment.REDIRECT_URI } });
  };


  return (
    <ErrorPage
      errorCode={1004}
      heading="No hay resultados..."
      onClick={handlelogout}
    />
  );
}

export { ErrorNotBusinessUnit };
