import { MdSearch } from "react-icons/md";
import { Button, Searchfield, Stack, Text } from "@inubekit/inubekit";
import { NoResultsMessage } from "@components/feedback/noResultsMessage";
import { RadioBusinessUnit } from "@components/feedback/RadioBusinessUnit";
import { tokens } from "@design/tokens";
import { businessUnitsLabel } from "@config/businessUnits/businessUnitsLabel";
import { IBusinessUnitsUI } from "@ptypes/selectBusinessUnits/IBusinessUnitsUI";
import {
  StyledBusinessUnits,
  StyledBusinessUnitsItem,
  StyledBusinessUnitsList,
} from "./styles";

const BusinessUnitsUI = (props: IBusinessUnitsUI) => {
  const {
    businessUnits,
    search,
    businessUnit,
    screenMobile,
    screenTablet,
    handleSearchChange,
    filterBusinessUnits,
    handleBussinessUnitChange,
    handleSubmit,
  } = props;

  const filteredBusinessUnits = filterBusinessUnits(businessUnits, search);

  return (
    <StyledBusinessUnits $isMobile={screenMobile}>
      <Text type="title" as="h2" textAlign="center">
        {businessUnitsLabel.title}
      </Text>
      <Text size="medium" textAlign="center">
        {businessUnitsLabel.selectUnit}
      </Text>
      <form>
        <Stack direction="column" alignItems="center" gap={tokens.spacing.s300}>
          {businessUnits.length > 5 && (
            <Searchfield
              placeholder={businessUnitsLabel.placeholderSearch}
              name="searchBusinessUnits"
              id="searchBusinessUnits"
              value={search}
              fullwidth={true}
              onChange={handleSearchChange}
              iconBefore={<MdSearch size={22} />}
            />
          )}
          {filteredBusinessUnits.length === 0 && (
            <NoResultsMessage search={search} />
          )}
          <StyledBusinessUnitsList
            $scroll={businessUnits.length > 5}
            $isMobile={screenMobile}
            $isTablet={screenTablet}
          >
            <Stack
              direction="column"
              padding={`${tokens.spacing.s0} ${tokens.spacing.s100}`}
              alignItems="center"
              gap={tokens.spacing.s100}
            >
              {filteredBusinessUnits.map((businessUnit) => (
                <StyledBusinessUnitsItem key={businessUnit.publicCode}>
                  <RadioBusinessUnit
                    name="businessUnit"
                    label={businessUnit.abbreviatedName}
                    id={businessUnit.publicCode}
                    value={businessUnit.abbreviatedName}
                    logo={businessUnit.urlLogo}
                    handleChange={handleBussinessUnitChange}
                  />
                </StyledBusinessUnitsItem>
              ))}
            </Stack>
          </StyledBusinessUnitsList>
          <Button
            type="button"
            disabled={businessUnit.value}
            onClick={handleSubmit}
          >
            {businessUnitsLabel.labelButton}
          </Button>
        </Stack>
      </form>
    </StyledBusinessUnits>
  );
};

export { BusinessUnitsUI };
