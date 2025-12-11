const IS_PRODUCTION = import.meta.env.PROD;
const AUTH_REDIRECT_URI = import.meta.env.VITE_AUTH0_REDIRECT_URI;

const periodLaterYears = 3;
const periodPreviousYears = 1;

const mediaQueryMobile = "(max-width: 770px)";

const maxRetriesServices = 5;
const fetchTimeoutServices = 3000;

const secretKeyPortalId = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"

const enviroment = {
  CLIENT_ID: import.meta.env.VITE_AUTH0_CLIENT_ID,
  CLIENT_SECRET: import.meta.env.VITE_AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN: import.meta.env.VITE_AUTH0_DOMAIN,
  REDIRECT_URI: IS_PRODUCTION ? window.location.origin : AUTH_REDIRECT_URI,
   PORTAL_CATALOG_ID: import.meta.env.VITE_PORTAL_CATALOG_ID,
  IPROCESS_API_URL_QUERY: import.meta.env.VITE_IPROCESS_API_URL_QUERY,
  IPROCESS_API_URL_QUERY_ENUM: import.meta.env.VITE_IPROCESS_API_URL_QUERY_ENUM,
  IPROCESS_API_URL_PERSISTENCE: import.meta.env
    .VITE_IPROCESS_API_URL_PERSISTENCE,
  IVITE_ISAAS_QUERY_PROCESS_SERVICE: import.meta.env
    .VITE_ISAAS_QUERY_PROCESS_SERVICE,
  IPORTAL_STAFF_QUERY_PROCESS_SERVICE: import.meta.env
    .VITE_IPORTAL_STAFF_QUERY_PROCESS_SERVICE,
      ORIGINATOR_ID: import.meta.env.VITE_ORIGINATOR_ID as string,
  IAUTH_URL: import.meta.env.VITE_IAUTH_URL as string,
  IAUTH_SERVICE_URL: import.meta.env.VITE_IAUTH_SERVICE_URL as string,
  CODE_VERIFIER: import.meta.env.VITE_AUTH_CODE_VERIFIER as string,
  CODE_CHALLENGE: import.meta.env.VITE_AUTH_CODE_CHALLENGE as string,
  STATE: import.meta.env.VITE_AUTH_STATE as string,
  APPLICATION_NAME: import.meta.env.VITE_APPLICATION_NAME as string,
  ORIGINATOR_CODE: import.meta.env.VITE_ORIGINATOR_CODE as string,
};

export {
  enviroment,
  periodLaterYears,
  periodPreviousYears,
  mediaQueryMobile,
  maxRetriesServices,
  fetchTimeoutServices,
  secretKeyPortalId,
};
