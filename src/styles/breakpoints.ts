const small = 768;
const medium = 1024;
const large = 1440;

export const media = {
  mobile: `(max-width: ${small - 1}px)`,
  tablet: `(min-width: ${small}px)`,
  desktop: `(min-width: ${medium}px)`,
  cinema: `(min-width: ${large}px)`,
};
