import { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineChevronRight } from "react-icons/md";
import {
  useMediaQuery,
  Stack,
  Text,
  Grid,
  Icon,
  Spinner,
  Header,
  Nav,
} from "@inubekit/inubekit";

import { userMenu } from "@config/nav";
import { AppContext } from "@context/AppContext";
import { BusinessUnitChange } from "@design/inputs/BusinessUnitChange";
import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortalBusiness.types";
import { decrypt } from "@utils/encrypt";
import { tokens } from "@design/tokens";
import { RenderLogo } from "@components/feedback/renderLogo";
import { actionsConfig } from "@config/mainActionLogout";
import { mainNavigation } from "@config/mainNavigation";
import {
  StyledAppPage,
  StyledCollapse,
  StyledCollapseIcon,
  StyledContainer,
  StyledHeaderContainer,
  StyledMain,
} from "./styles";
import { ErrorPage } from "../ErrorPage";
import { useOptionsByBusinessUnit } from "@hooks/useOptionsByBusinessunits";

function AppPage() {
  const {
    appData,
    businessUnitsToTheStaff,
    setBusinessUnitSigla,
    businessUnitSigla,
  } = useContext(AppContext);
  const [collapse, setCollapse] = useState(false);
  const collapseMenuRef = useRef<HTMLDivElement>(null);
  const businessUnitChangeRef = useRef<HTMLDivElement>(null);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const portalId = localStorage.getItem("portalCode");
  const staffPortalId = portalId ? decrypt(portalId) : "";

  const { optionsCards, loading } = useOptionsByBusinessUnit({
    staffPortalId,
    businessUnit: businessUnitSigla,
  });

  const navigate = useNavigate();
  const isTablet = useMediaQuery("(max-width: 849px)");

  useEffect(() => {
    if (appData.businessUnit.publicCode) {
      setSelectedClient(appData.businessUnit.abbreviatedName);
    }
  }, [appData]);

  const handleLogoClick = (businessUnit: IBusinessUnitsPortalStaff) => {
    const selectJSON = JSON.stringify(businessUnit);
    setBusinessUnitSigla(selectJSON);
    setSelectedClient(businessUnit.abbreviatedName);
    setCollapse(false);
    navigate("/");
  };

  const location = useLocation();

  const { optionsHeader, optionsNav } = mainNavigation(optionsCards, location);

  return (
    <StyledAppPage>
      {loading ? (
        <Stack gap={tokens.spacing.s200} direction="column" padding="300px">
          <Stack direction="column">
            <Text type="title" size="small" textAlign="center">
              Espere un momento, por favor.
            </Text>
          </Stack>
          <Stack alignItems="center" direction="column">
            <Spinner size="large" />
          </Stack>
        </Stack>
      ) : (
        <>
          {optionsCards && optionsCards.length > 0 ? (
            <Grid templateRows="auto 1fr" height="100vh" justifyContent="unset">
              <StyledHeaderContainer>
                <Header
                  navigation={optionsHeader}
                  user={{
                    username: appData.user.userName,
                    breakpoint: "1281px",
                  }}
                  logoURL={RenderLogo({ imgUrl: appData.businessUnit.urlLogo })}
                  menu={userMenu}
                />
              </StyledHeaderContainer>
              {businessUnitsToTheStaff.length > 1 && (
                <>
                  <StyledCollapseIcon
                    $collapse={collapse}
                    onClick={() => setCollapse(!collapse)}
                    $isTablet={isTablet}
                    ref={collapseMenuRef}
                  >
                    <Icon
                      icon={<MdOutlineChevronRight />}
                      appearance="primary"
                      size="24px"
                      cursorHover
                    />
                  </StyledCollapseIcon>
                  {collapse && (
                    <StyledCollapse ref={businessUnitChangeRef}>
                      <BusinessUnitChange
                        businessUnits={businessUnitsToTheStaff}
                        onLogoClick={handleLogoClick}
                        selectedClient={selectedClient}
                      />
                    </StyledCollapse>
                  )}
                </>
              )}
              <StyledContainer>
                <Grid
                  templateColumns={!isTablet ? "auto 1fr" : "1fr"}
                  alignContent="unset"
                  height={"95vh"}
                >
                  {!isTablet && optionsCards && (
                    <Nav navigation={optionsNav} actions={actionsConfig()} />
                  )}
                  <StyledMain>
                    <Outlet />
                  </StyledMain>
                </Grid>
              </StyledContainer>
            </Grid>
          ) : (
            <ErrorPage />
          )}
        </>
      )}
    </StyledAppPage>
  );
}

export { AppPage };
