import { useContext, useEffect, useRef, useState } from "react";
import { MdOutlineChevronRight, MdOutlineDoorFront } from "react-icons/md";
import { useMediaQuery, Text, Icon, Header } from "@inubekit/inubekit";

import { AppContext } from "@context/AppContext";
import { useOptionsByBusinessUnit } from "@hooks/useOptionsByBusinessunits";
import { AppCard } from "@components/feedback/AppCard";
import { userMenu } from "@config/nav";
import { Title } from "@design/data/Title";
import { BusinessUnitChange } from "@design/inputs/BusinessUnitChange";
import { IBusinessUnitsPortalStaff } from "@ptypes/staffPortalBusiness.types";
import { ICardData } from "./types";
import {
  StyledCollapse,
  StyledCollapseIcon,
  StyledContainer,
  StyledContainerCards,
  StyledContainerSection,
  StyledFooter,
  StyledHeaderContainer,
  StyledLogo,
  StyledTitle,
} from "./styles";
import { RenderLogo } from "@components/feedback/renderLogo";
import { mainNavigation } from "@config/mainNavigation";
import { useLocation } from "react-router-dom";
import { decrypt } from "@utils/encrypt";

interface HomeProps {
  selectedClient: string;
  setSelectedClient: (show: string) => void;
  data?: ICardData[];
  isLoading?: boolean;
}

function HomeUI(props: HomeProps) {
  const { data, isLoading, selectedClient, setSelectedClient } = props;
  const portalId = localStorage.getItem("portalCode");
  const staffPortalId = portalId ? decrypt(portalId) : "";
  const { appData, businessUnitsToTheStaff, businessUnitSigla, setBusinessUnitSigla } =
    useContext(AppContext);
  const [collapse, setCollapse] = useState(false);
 
  const collapseMenuRef = useRef<HTMLDivElement>(null);
  const businessUnitChangeRef = useRef<HTMLDivElement>(null);
  const isTablet = useMediaQuery("(max-width: 944px)");
  const username = appData.user.userName.split(" ")[0];

    const { optionsCards } = useOptionsByBusinessUnit({
    staffPortalId,
    businessUnit: businessUnitSigla,
  });
 
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
  };

    const location = useLocation();

  const { optionsHeader } = mainNavigation(optionsCards, location);
 
  return (
    <>
      <StyledContainer>
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
        </StyledHeaderContainer>
        <StyledContainerSection>
          <StyledTitle>
            <Title
              title={`Bienvenid@, ${username}`}
              description="Selecciona una opción para empezar a ajustar la configuración de tu software Linix"
              icon={<MdOutlineDoorFront />}
              sizeTitle="large"
            />
          </StyledTitle>
          <StyledContainerCards>
            {isLoading ? (
              <>
                <AppCard
                  label={""}
                  description={""}
                  icon={""}
                  url={""}
                  loading
                />
              </>
            ) : (
              <>
                {data && data?.length > 0 ? (
                  data?.map((card) => (
                    <AppCard
                      key={card.id}
                      label={card.label}
                      description={card.description}
                      icon={card.icon}
                      url={card.url}
                      loading={false}
                    />
                  ))
                ) : (
                  <Text type="body" size="medium">
                    No se encontró información
                  </Text>
                )}{" "}
              </>
            )}
          </StyledContainerCards>
        </StyledContainerSection>
      </StyledContainer>
        <StyledFooter>
          <StyledLogo src={appData.businessManager.urlBrand} />
        </StyledFooter>
    </>
  );
}

export { HomeUI };
