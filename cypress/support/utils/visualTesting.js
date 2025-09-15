export class VisualTesting {
  static compareScreenshot(name, options = {}) {
    const defaultOptions = {
      threshold: 0.2,
      thresholdType: 'percent',
      ...options
    };
    
    cy.screenshot(name);
    // Aqui você integraria com percy.io, applitools ou cypress-image-diff
    return cy.task('compareScreenshot', { name, options: defaultOptions });
  }

  static checkElementVisibility(selector, shouldBeVisible = true) {
    if (shouldBeVisible) {
      cy.get(selector).should('be.visible');
    } else {
      cy.get(selector).should('not.be.visible');
    }
  }

  static checkResponsiveDesign(breakpoints = ['mobile', 'tablet', 'desktop']) {
    const viewports = {
      mobile: [375, 667],
      tablet: [768, 1024],
      desktop: [1280, 720]
    };

    breakpoints.forEach(breakpoint => {
      const [width, height] = viewports[breakpoint];
      cy.viewport(width, height);
      cy.screenshot(`responsive-${breakpoint}`);
    });
  }
}