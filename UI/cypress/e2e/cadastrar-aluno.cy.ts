describe('Cadastrar aluno', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/AutoCompManager');
        cy.get(':nth-child(2) > .nav-link').click();        
    });

    it('Cadastrar um aluno na equipe Lontras', () => {
        cy.get('#mat-input-0').type('Gabriel Cypress');
        cy.get('#mat-input-1').type('Testar com cypress');
        cy.get(':nth-child(3) > .mat-mdc-form-field > .mat-mdc-text-field-wrapper > .mat-mdc-form-field-flex > .mat-mdc-form-field-infix').click();
        cy.get('#mat-option-6').click();
    }); 
})