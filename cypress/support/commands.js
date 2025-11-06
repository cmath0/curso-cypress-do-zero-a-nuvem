// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('input[id="firstName"]').type('Matheus', {delay: 0})
    cy.get('input[id="lastName"]').type('Cardoso', {delay: 0})
    cy.get('input[id="email"]').type('emaildomatheus@teste.com', {delay: 0})
    cy.get('textarea[id="open-text-area"]').type('Teste de texto de feedback.', {delay: 0})
    cy.contains('button', 'Enviar').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitWithDefaultObject', ({
        firstName = 'Matheus', 
        lastName = 'Cardoso', 
        email = 'emaildomatheus@teste.com',
        feedback = 'Teste de texto de feedback'
    } = {}) => {
    cy.get('input[id="firstName"]').type(firstName, {delay: 0})
    cy.get('input[id="lastName"]').type(lastName, {delay: 0})
    cy.get('input[id="email"]').type(email, {delay: 0})
    cy.get('textarea[id="open-text-area"]').type(feedback, {delay: 0})
    cy.contains('button', 'Enviar').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitWithObject', (data) => {
    cy.get('input[id="firstName"]').type(data.firstName, {delay: 0})
    cy.get('input[id="lastName"]').type(data.lastName, {delay: 0})
    cy.get('input[id="email"]').type(data.email, {delay: 0})
    cy.get('textarea[id="open-text-area"]').type(data.feedback, {delay: 0})
    cy.contains('button', 'Enviar').click()
})