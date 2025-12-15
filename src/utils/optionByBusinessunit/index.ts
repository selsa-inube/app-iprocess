import { options } from "../optionsByBusinessUnits";

const normalizeOptionsByPublicCode = (publicCode: string) =>
  options.find((data) => data.publicCode === publicCode);

export { normalizeOptionsByPublicCode };
