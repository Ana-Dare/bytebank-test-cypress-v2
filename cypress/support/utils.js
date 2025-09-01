export const isMobile = () => {
  return (
    Cypress.config('viewportWidth') <
    Cypress.env('mobileViewPortWidthBreakpoint')
  );
};
