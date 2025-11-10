import { useAuth0 } from "@auth0/auth0-react";
import { ErrorPage } from "@components/layout/ErrorPage";
import { enviroment } from "@config/environment";
import { useClearLocalStorage } from "@hooks/useClearLocalStorage";

function ErrorNotBusinessUnit() {
   const { logout } = useAuth0();

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
