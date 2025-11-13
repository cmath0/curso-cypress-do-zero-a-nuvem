Cypress._.times(3, () => {
    it('testa a página da política de privacidade de forma independente', () => {
        cy.visit('./src/privacy.html')
    
        cy.contains('#title', 'CAC TAT - Política de Privacidade')
            .should('be.visible')
    })
})