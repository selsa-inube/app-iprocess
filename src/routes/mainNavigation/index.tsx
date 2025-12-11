import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
 
import { Landing } from "@pages/home/landing";
import { Logout } from "@pages/login/logout";
import { AppPage } from "@components/layout/AppPage";
import { ErrorPage } from "@components/layout/ErrorPage";
import { SelectBusinessUnitsRoutes } from "../selectBusinessunits";
import { StartProcessRoutes } from "../startProcess";
import { ConfirmInitiatedRoutes } from "../confirmInitiated";
import { ValidateProgressRoutes } from "../validateProgress";
import { FinishedRoutes } from "../finished";

const mainNavigation = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="selectBusinessUnit/*"
        element={<SelectBusinessUnitsRoutes />}
      />
      <Route path="/" element={<Landing />} errorElement={<ErrorPage />}/>
      <Route path="/" element={<AppPage />}>
        <Route path="start-process/*" element={<StartProcessRoutes />} />
        <Route
          path="confirm-initiated/*"
          element={<ConfirmInitiatedRoutes />}
        />
        <Route
          path="validate-progress/*"
          element={<ValidateProgressRoutes />}
        />
        <Route path="finished/*" element={<FinishedRoutes />} />
      </Route>
      <Route path="logout" element={<Logout />} />
    </>,
  ),
);

export { mainNavigation };
