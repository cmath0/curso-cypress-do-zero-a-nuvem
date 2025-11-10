describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('abcdefgh ', 10)

    cy.get('input[id="firstName"]').type('Matheus', {delay: 0})
    cy.get('input[id="lastName"]').type('Cardoso', {delay: 0})
    cy.get('input[id="email"]').type('emaildomatheus@teste.com', {delay: 0})
    cy.get('textarea[id="open-text-area"]').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('span[class="success"').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('input[id="firstName"]').type('Matheus', {delay: 0})
    cy.get('input[id="lastName"]').type('Cardoso', {delay: 0})
    cy.get('input[id="email"]').type('emaildomatheusteste', {delay: 0})
    cy.get('textarea[id="open-text-area"]').type('Teste de texto de feedback.', {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('span[class="error"').should('be.visible')
  })

  it('não permite digitar valores não numéricos no campo de telefone', () => {
    cy.get('input[id="phone"]').type('telInvalido', {delay: 0})
    cy.get('input[id="phone"]').type('-', {delay: 0})
    cy.get('input[id="phone"]').type('(', {delay: 0})
    cy.get('input[id="phone"]').type(')', {delay: 0})

    cy.get('input[id="phone"]').should('have.value', '')
  })

  
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    // Preenchendo campos obrigatórios
    cy.get('input[id="firstName"]').type('Matheus', {delay: 0})
    cy.get('input[id="lastName"]').type('Cardoso', {delay: 0})
    cy.get('input[id="email"]').type('emaildomatheus@teste.com', {delay: 0})
    cy.get('textarea[id="open-text-area"]').type('Teste de texto de feedback.', {delay: 0})
    
    // Habilitando checkbox telefone, logo o campo de telefone deve se tornar obrigatório
    cy.get('input[id="phone-checkbox"]').check()

    // Submeter formulário sem preencher telefone
    cy.contains('button', 'Enviar').click()

    cy.get('span[class="error"').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    // preencher campos
    cy.get('input[id="firstName"]').type('Matheus', {delay: 0})
    cy.get('input[id="lastName"]').type('Cardoso', {delay: 0})
    cy.get('input[id="email"]').type('emaildomatheus@teste.com', {delay: 0})
    cy.get('input[id="phone"]').type('999556644', {delay: 0})
    
    // validar campos preenchidos
    cy.get('input[id="firstName"]').should('have.value', 'Matheus')
    cy.get('input[id="lastName"]').should('have.value', 'Cardoso')
    cy.get('input[id="email"]').should('have.value', 'emaildomatheus@teste.com')
    cy.get('input[id="phone"]').should('have.value', '999556644')

    // limpar campos
    cy.get('input[id="firstName"]').clear()
    cy.get('input[id="lastName"]').clear()
    cy.get('input[id="email"]').clear()
    cy.get('input[id="phone"]').clear()

    // validar campos vazios
    cy.get('input[id="firstName"]').should('have.value', '')
    cy.get('input[id="lastName"]').should('have.value', '')
    cy.get('input[id="email"]').should('have.value', '')
    cy.get('input[id="phone"]').should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()

    cy.get('span[class="error"').should('be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Lucia',
      lastName: 'Rodrigues',
      email: 'lucia.rodrigues@emaildetestes.com',
      feedback: 'Feedback da Lucia.'
    }

    cy.fillMandatoryFieldsAndSubmitWithDefaultObject(data)
    
    cy.get('span[class="success"').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[name="atendimento-tat"]').check('feedback')

    cy.get('input[name="atendimento-tat"][value="feedback"]')
      .should('be.checked')
      .and('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[name="atendimento-tat"]')
      .each((tipoAtendimento) => {
        cy.wrap(tipoAtendimento)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    // marca todos os checkboxes
    cy.get('#check input[type="checkbox"')
      .as('checkboxes')
      .check()
    
    // valida que todos os checkboxes estão marcados e desmarca último checkbox
    cy.get('@checkboxes')
      .should('be.checked')
      .last()
      .uncheck()
    
    // valida que último checkbox foi desmarcado
    cy.get('@checkboxes')
      .last()
      .should('not.be.checked')

  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json')
    .then(input => {
      expect(input[0].files[0].name).to.equal('example.json', { action: 'drag-drop' })
    })
  })
  
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json')
      .as('exampleFile')

    cy.get('#file-upload')
      .selectFile('@exampleFile')
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    
    cy.contains('#title', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })
})
