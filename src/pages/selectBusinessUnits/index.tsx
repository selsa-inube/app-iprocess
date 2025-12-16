import { useContext } from "react";
import { AppContext } from "@context/AppContext";
import { useSelectBusinessUnits } from "@hooks/selectBusinessUnits/useSelectBusinessUnits";
import { SelectBusinessUnitsUI } from "./interface";


const SelectBusinessUnits=() =>{
 
  const { appData, setBusinessUnitsToTheStaff } = useContext(AppContext);

    const { imageWidth, screenTablet, screenDesktop } = useSelectBusinessUnits(
    appData,
    setBusinessUnitsToTheStaff,
  );
   return (
    <SelectBusinessUnitsUI
      appData={appData}
      screenTablet={screenTablet}
      screenDesktop={screenDesktop}
      imageWidth={imageWidth}
    />
  );
}

export { SelectBusinessUnits };
