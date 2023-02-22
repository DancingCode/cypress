import homePage from "../pageObjects/homePage"
import '../support/commands';

describe('Upon completing checkout', () => {
    it('should present a purchase confirmation page for an order', () => {
        cy.visit('/')
        cy.setCookiePreferenceAs('Accept All Cookies')
        cy.addProductToCart(homePage.productCard86)
        cy.checkoutCart()
        cy.enterNewCustomerDetails()
        cy.enterShippingDetails('GB', 'First Name', 'Last Name', '1, Test Street', 'London', '07866432135', 'NW1 2FB')
        cy.wait(5000)
        cy.continueWithShippingMethod()
        cy.enterBillingDetails('4111 1111 1111 1111', 'Test User', '0427', '411')
        cy.placeOrder()
        cy.assertOrderIsConfirmed()
    })
})
