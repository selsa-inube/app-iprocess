import { Stack, Text, useMediaQueries, Button, Tag } from "@inubekit/inubekit";

import inubeLogo from "@assets/images/logo-inube.png";
import errorImage from "@assets/images/errorPage.png";
import { tokens } from "@design/tokens";

import { errorCodes } from "@config/errorCodes";
import {
  StyledCompanyLogo,
  StyledContainer,
  StyledDividerContainer,
  StyledErrorImage,
  StyledItem,
  StyledList,
  StyledTextErrorContainer,
} from "./styles";
import { errorLabels } from "@config/errorLabels";
import { errorPageLabels } from "@config/errorPageLabels";
import { IErrorPage } from "@ptypes/design/IErrorPage";
import { ComponentAppearance } from "@ptypes/aparences.types";

const ErrorPage = (props: IErrorPage) => {
  const {
    errorCode = 0,
    heading = "¡Ups! Algo salió mal...",
    nameButton = "Regresar",
    onClick,
  } = props;

  const mediaQueries = [
    "(min-width: 771px)",
    "(max-width: 770px)",
    "(max-width: 1000px)",
  ];
  const matches = useMediaQueries(mediaQueries);

  const DetailsErrors = errorCodes[errorCode] ?? {
     descriptionError: [errorLabels.descriptionError],
    solutionError: [errorLabels.solutionError],
  };

  return (
    <StyledContainer $isTablet={matches["(max-width: 1000px)"]}>
      <Stack
        direction="column"
        gap={tokens.spacing.s300}
        height="100%"
        width="100%"
      >
        <Stack justifyContent="left" alignItems="start">
          <StyledCompanyLogo
            src={inubeLogo}
            alt={"logo"}
            $isTablet={matches["(max-width: 1000px)"]}
          />
        </Stack>
        <Stack
          justifyContent="center"
          alignItems="center"
          height="100px"
          width="100%"
          direction="column"
          gap={tokens.spacing.s150}
        >
          <Text
            type="headline"
            weight="bold"
            size={matches["(max-width: 770px)"] ? "medium" : "large"}
            appearance={ComponentAppearance.DARK}
          >
            {heading}
          </Text>
          <Tag
            appearance={ComponentAppearance.GRAY}
            label={`${errorLabels.codeLabel} ${errorCode}`}
            displayIcon={false}
          />
        </Stack>
        <StyledErrorImage
          $isTablet={matches["(max-width: 770pxpx)"]}
          src={errorImage}
          alt="error"
        />
        <StyledTextErrorContainer $isTablet={matches["(max-width: 770px)"]}>
          <Stack
            direction="column"
            gap={tokens.spacing.s150}
            width="100%"
            height="100%"
          >
            <Text
              type="title"
              size="large"
              weight="bold"
              appearance={ComponentAppearance.DARK}
            >
              {errorPageLabels.whatWentWrong}
            </Text>
            <StyledList>
              {DetailsErrors.descriptionError.map((item, index) => (
                <StyledItem key={index}>
                  <Text
                    type="title"
                    size="small"
                    appearance={ComponentAppearance.GRAY}
                  >
                    {item}
                  </Text>
                </StyledItem>
              ))}
            </StyledList>
          </Stack>

          <StyledDividerContainer $isTablet={matches["(max-width: 1000px)"]} />

          <Stack
            direction="column"
            gap={tokens.spacing.s150}
            width="100%"
            height="100%"
          >
            <Text
              type="title"
              size="large"
              weight="bold"
              appearance={ComponentAppearance.DARK}
            >
              {errorPageLabels.howToFixIt}
            </Text>
            <StyledList>
              {DetailsErrors.solutionError.map((item, index) => (
                <StyledItem key={index}>
                  <Text
                    type="title"
                    size="small"
                    appearance={ComponentAppearance.GRAY}
                  >
                    {item}
                  </Text>
                </StyledItem>
              ))}
            </StyledList>
            <Stack alignContent="center" justifyContent="center">
              <Button
                appearance={ComponentAppearance.PRIMARY}
                onClick={onClick}
              >
                {nameButton}
              </Button>
            </Stack>
          </Stack>
        </StyledTextErrorContainer>
        <Text
          appearance={ComponentAppearance.GRAY}
          textAlign="center"
          size="small"
          weight="bold"
        >
          {errorPageLabels.inube}
        </Text>
      </Stack>
    </StyledContainer>
  );
};

export { ErrorPage };
