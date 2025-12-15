import { useContext } from "react";

import { Home } from "@pages/home";
import { SelectBusinessUnits } from "@pages/selectBusinessUnits";
import { AppContext } from "@context/AppContext";

const Landing = () => {
  const { businessUnitSigla } = useContext(AppContext);

  return businessUnitSigla.length === 0 ? <SelectBusinessUnits /> : <Home />;
};

export { Landing };
