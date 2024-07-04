describe('Cadastrar equipe', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/AutoCompManager');
        cy.get(':nth-child(1) > .nav-link').click();
    });

    it('Cadastrar equipe inserindo todos os campos obrigatórios', () => {
      cy.get('#mat-input-0').type('Equipe dos testes');
      cy.get('#mat-input-1').type('10');
    //   cy.get('.mdc-button__label').click();
    });
  })