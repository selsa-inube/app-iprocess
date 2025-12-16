import { MdOutlineChevronRight, MdOutlineDoorFront } from "react-icons/md";
import { Icon, Header } from "@inubekit/inubekit";
import { AppCard } from "@components/feedback/AppCard";
import { RenderLogo } from "@components/feedback/renderLogo";
import { BoxContainer } from "@components/layout/boxContainer";
import { ErrorPage } from "@components/layout/ErrorPage";
import { BusinessUnitChange } from "@design/inputs/BusinessUnitChange";
import { tokens } from "@design/tokens";
import { Title } from "@design/data/Title";
import { homeLabels } from "@config/home/homeLabels";
import { userMenu } from "@config/nav";
import { IHomeUI } from "@ptypes/home/IHomeUI";
import { ComponentAppearance } from "@ptypes/aparences.types";
import {
  StyledCollapse,
  StyledCollapseIcon,
  StyledFooter,
  StyledHeaderContainer,
  StyledLogo,
  StyledTitle,
} from "./styles";

const HomeUI = (props: IHomeUI) => {
  const {
    data,
    appData,
    businessUnitChangeRef,
    businessUnitsToTheStaff,
    collapse,
    collapseMenuRef,
    selectedClient,
    loading,
    username,
    screenMobile,
    screenTablet,
    screenTabletHeader,
    hasMultipleBusinessUnits,
    optionsHeader,
    dataExists,
    padding,
    onlogout,
    setCollapse,
    handleLogoClick,
  } = props;

  return (
    <>
      <BoxContainer
        width="100%"
        direction="column"
        boxSizing="border-box"
        padding={padding}
        height="100vh"
        overflowY="auto"
        backgroundColor={ComponentAppearance.LIGHT}
      >
        <StyledHeaderContainer>
          <Header
            navigation={optionsHeader}
            logoURL={<RenderLogo imgUrl={appData.businessUnit.urlLogo} />}
            user={{
              username: appData.user.userName,
              breakpoint: "848px",
            }}
            menu={userMenu}
          />
          {hasMultipleBusinessUnits && (
            <>
              <StyledCollapseIcon
                $collapse={collapse}
                onClick={() => setCollapse(!collapse)}
                $isTablet={screenTabletHeader}
                ref={collapseMenuRef as React.RefObject<HTMLDivElement>}
              >
                <Icon
                  icon={<MdOutlineChevronRight />}
                  appearance={ComponentAppearance.PRIMARY}
                  size="24px"
                  cursorHover
                />
              </StyledCollapseIcon>
              {collapse && (
                <StyledCollapse
                  ref={businessUnitChangeRef as React.RefObject<HTMLDivElement>}
                >
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
        <BoxContainer
          alignItems="center"
          justifyContent="center"
          gap={tokens.spacing.s600}
          boxSizing="border-box"
          padding={tokens.spacing.s200}
        >
          <BoxContainer
            direction="column"
            gap={
              screenMobile ? `${tokens.spacing.s300}` : `${tokens.spacing.s0}`
            }
            backgroundColor={ComponentAppearance.LIGHT}
            maxWidth="1064px"
            minWidth="328px"
            boxSizing="border-box"
          >
            {(loading || dataExists) && (
              <StyledTitle $isTablet={screenTablet}>
                <Title
                  title={`${homeLabels.welcome} ${username}`}
                  description={homeLabels.description}
                  icon={<MdOutlineDoorFront />}
                  sizeTitle="large"
                />
              </StyledTitle>
            )}
            <BoxContainer
              direction="row"
              boxSizing="border-box"
              justifyContent={screenTablet ? "center" : "flex-start"}
              wrap="wrap"
              gap={tokens.spacing.s400}
              backgroundColor={ComponentAppearance.LIGHT}
            >
              <BoxContainer
                direction="row"
                boxSizing="border-box"
                padding={tokens.spacing.s200}
                justifyContent={screenTablet ? "center" : "flex-start"}
                wrap="wrap"
                width="100%"
                gap={tokens.spacing.s250}
                backgroundColor={ComponentAppearance.LIGHT}
                borderColor={ComponentAppearance.DARK}
                borderRadius={tokens.spacing.s100}
              >
                {loading ? (
                  <AppCard
                    label={""}
                    description={""}
                    icon={""}
                    url={""}
                    loading
                  />
                ) : (
                  <>
                    {dataExists ? (
                      <>
                        {data?.map((card) => (
                          <AppCard
                            key={card.id}
                            label={card.publicCode}
                            description={card.description}
                            icon={card.icon}
                            url={card.url}
                            loading={false}
                          />
                        ))}
                      </>
                    ) : (
                      <BoxContainer
                        boxSizing="border-box"
                        width="100%"
                        height="100%"
                      >
                        <ErrorPage errorCode={500} onClick={onlogout} />
                      </BoxContainer>
                    )}
                  </>
                )}
              </BoxContainer>
            </BoxContainer>
          </BoxContainer>
        </BoxContainer>
        {dataExists && (
          <StyledFooter $isMobile={screenMobile}>
            <StyledLogo src={appData.businessManager.urlBrand} />
          </StyledFooter>
        )}
      </BoxContainer>
    </>
  );
};

export { HomeUI };
