import { el } from "../fixtures/elements";
describe('Usuário logado na página de dashboard', () => {
    beforeEach(function () {

        cy.login(Cypress.env('username'), Cypress.env('password'));
        cy.fixture('products').then((products) => {
            this.products = products;
        });
    });

    context('Redirecionamento na página de dashboard', () => {
        it('Verifica página de redirecionamento no login com sucesso', () => {
            cy.location('pathname').should('eq', '/inventory.html');
        });
    });

    context('Carrinho de compras', () => {
        it('Adiciona um item ao carrinho e valida os detalhes', () => {
            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
            cy.get('.shopping_cart_badge').should('contain', '1');
            cy.get('.shopping_cart_link').click();

            // Valida se o item aparece no carrinho
            cy.get('.cart_item').should('be.visible');
            cy.get(el.title).should('contain', 'Sauce Labs Backpack');
            cy.get(el.description).should('contain', 'carry.allTheThings()');
            cy.get(el.price).should('contain', '$29.99');
        });

        it('Adiciona um item ao carrinho usando fixture', function () {
            cy.get(this.products.backpack.selector).click();
            cy.get('.shopping_cart_badge').should('contain', '1');
            cy.get('.shopping_cart_link').click();
            cy.get(el.title).should('contain', this.products.backpack.name);
            cy.get(el.price).should('contain', this.products.backpack.price);
        });

        it('Remove um item do carrinho e valida carrinho vázio', () => {
            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
            cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible');
            cy.get('.shopping_cart_badge').should('contain', '1');

            // Remove o item do carrinho
            cy.get('[data-test="remove-sauce-labs-backpack"]').click();
            cy.get('.shopping_cart_badge').should('not.exist');
        });
    });
});
