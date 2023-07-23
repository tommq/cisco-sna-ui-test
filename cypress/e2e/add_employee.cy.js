/// <reference types="cypress" />

describe('Add Employee Form', () => {
    it('should handle input validation', () => {

        cy.visit('http://localhost:3000/add-employee');

        cy.get('[data-testid="name-input"]').type('Jane Doe');
        cy.get('[data-testid="jobTitle-input"]').type('Engineer');
        cy.get('[data-testid="tenure-input"]').type('2');
        cy.get('[data-testid="gender-input"]').type('Female');

        cy.get('[data-testid="add-employee-form-submit-button"]').click();

        cy.get('table').contains('td', 'Jane Doe');
        cy.get('table').contains('td', 'Engineer');
    });
});
