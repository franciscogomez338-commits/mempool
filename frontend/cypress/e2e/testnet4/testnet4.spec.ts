describe('Testnet4', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/v1/fees/recommended', {
      fastestFee: 10,
      halfHourFee: 5,
      hourFee: 2,
      minimumFee: 1
    }).as('getFees');

    cy.intercept('GET', '**/api/v1/blocks/mempool', []).as('getMempoolBlocks');
    cy.visit('/');
  });

  it('loads the dashboard', () => {
    cy.waitUntil(
      () => cy.get('.skeleton-loader, .skeleton', { timeout: 15000 }).should('not.exist'),
      {
        timeout: 20000,
        interval: 500,
        errorMsg: 'Skeleton loaders lasted too long'
      }
    );
  });

  it('loads the pools screen', () => {
    cy.visit('/pools');
    cy.waitUntil(
      () => cy.get('.skeleton-loader, .skeleton').should('not.exist'),
      { timeout: 20000, interval: 500 }
    );
  });

  it('loads the graphs screen', () => {
    cy.visit('/graphs');
    cy.waitUntil(
      () => cy.get('.skeleton-loader, .skeleton').should('not.exist'),
      { timeout: 20000, interval: 500 }
    );
  });

  it('loads the api screen', () => {
    cy.visit('/docs/api');
    cy.waitUntil(
      () => cy.get('.skeleton-loader, .skeleton').should('not.exist'),
      { timeout: 20000, interval: 500 }
    );
  });
});
