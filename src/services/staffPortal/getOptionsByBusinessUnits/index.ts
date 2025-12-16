import { IOptionsByBusinessUnits } from "@ptypes/staffPortalBusiness.types";
import {
  enviroment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { mapOptionsByBusinessUnitsToEntities } from "./mappers";


const optionsByBusinessUnits = async (
  businessUnitPublicCode: string,
 staffPortalId: string,
  userAccount: string,
): Promise<IOptionsByBusinessUnits[]> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
        
        const queryParams = new URLSearchParams({
            portalPublicCode: staffPortalId,
            businessUnitPublicCode: businessUnitPublicCode,
          });
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          "X-Action": "SearchOptionForStaff",
          "Content-type": "application/json; charset=UTF-8",
           "X-User-Name": userAccount,
        },
        signal: controller.signal,
      };

      const res = await fetch(
       `${enviroment.IPORTAL_STAFF_QUERY_PROCESS_SERVICE}/staffs?${queryParams.toString()}`,
        options
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return [];
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener los datos del operador",
          status: res.status,
          data,
        };
      }

      const normalizedBusineesUnits = Array.isArray(data)
        ? mapOptionsByBusinessUnitsToEntities(data)
        : [];

      return normalizedBusineesUnits;
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener los datos del operador."
        );
      }
    }
  }

  return [];
};

export { optionsByBusinessUnits };
