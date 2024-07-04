describe('Cadastro de equipe incorreto', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/AutoCompManager');
        cy.get(':nth-child(1) > .nav-link').click();
    });

    it('Tentar cadastrar equipe sem preencher os campos obrigatórios', () => {
      cy.get('#mat-input-0').click();
      cy.get('body').click();
      cy.get('#mat-mdc-error-0').should('be.visible');
      cy.get('#mat-input-1').click();
      cy.get('body').click();
      cy.get('#mat-mdc-error-1').should('be.visible');
    });
  })