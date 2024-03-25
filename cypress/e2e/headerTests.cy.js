describe('check static-right menu items in the header', () => {
  it('should has correct anchor in the href attribute', () => {
    cy.visit('https://research.stlouisfed.org/');   
    cy.contains('econlowdown', {matchCase: false}).should('be.visible').and('have.attr', 'href', 'https://www.econlowdown.org')    
  })  
})

describe('check search feature', () => {
  it('searching results should contain searched phrase', () => {
    cy.visit('https://research.stlouisfed.org/');  
    cy.get('#head-search').focus().type('Contact{enter}'); 
    cy.get('.display-query').should('contain', 'for Contact');     
  })
})

describe('check left dropdown menu redirection', () => {
  it('hover using trigger(\'mouseover\ and validate redirected url', () => {
    cy.visit('https://research.stlouisfed.org/');
    cy.get('#publications-link').trigger('mouseover');
    cy.contains('Eighth District Economy',{matchCase: false}).click();  
    cy.url().should('eq', 'https://research.stlouisfed.org/regecon/');  
  })
})
