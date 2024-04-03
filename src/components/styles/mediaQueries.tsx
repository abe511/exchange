

type Breakpoints = {
  sm: number,
  md: number,
  lg: number,
  xl: number,
  xxl: number,
};

export const breakpoints: Breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

export const mediaQueries = (point: keyof Breakpoints) => {
  return (style: TemplateStringsArray) => `
    @media (min-width: ${breakpoints[point]}px) {
      ${style}
    }
  `;
};