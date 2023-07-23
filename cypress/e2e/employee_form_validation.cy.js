/// <reference types="cypress" />

describe('Validate inputs in Employee Form', () => {
    it('should not submit if a required value is missing', () => {
        cy.visit('http://localhost:3000/add-employee');

        cy.get('[data-testid="name-input"]').type('Jane Doe');
        cy.get('[data-testid="jobTitle-input"]').type('Engineer');
        cy.get('[data-testid="gender-input"]').type('Female');

        cy.get('[data-testid="add-employee-form-submit-button"]').click();

        cy.get('div').contains('p', 'tenure is a required field');
    });
});
