describe('Main page', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should display main page', () => {
        cy.get('h1').contains('Star Wars Character Lists!');
    });

    it('should display load more button', () => {
        cy.get('button').should('exist');
    });

    it('should display the first 10 objects', () => {
        cy.get('.flex.flex-col').should('have.length', 10);
    });

    it('should load 10 more objects', () => {
        cy.get('.flex.flex-col').should('have.length', 10);
        cy.get('button').click();
        cy.get('.flex.flex-col').should('have.length', 20);
    });

    it('should navigate to character data', () => {
        cy.get('.flex.flex-col').within(() => {
            cy.get('a[href="/character/Luke%20Skywalker"]').click();
        });
        cy.get('a[href="/"]').should('exist');
    });
});

describe('Character page', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('.flex.flex-col').within(() => {
            cy.get('a[href="/character/Luke%20Skywalker"]').click();
        });
    });

    it('should navigate to main page', () => {
        cy.get('a[href="/"]').click();
        cy.get('button').should('exist');
    });

    it('should display character name', () => {
        cy.get('h1').contains('Luke Skywalker');
    });
    it('should display character information', () => {
        cy.get('span.capitalize').should('not.be.empty').and('have.length', 7);
    });
    it('should display film info', () => {
        cy.get('h1.text-2xl').contains('4 Films');
        cy.get('ul > li').should('have.length', 4);
    });
});
