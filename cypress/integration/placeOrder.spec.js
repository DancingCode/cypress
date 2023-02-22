describe('On completing checkout', () => {
    it('should present a purchase confirmation page for my order', () => {
        cy.visit('https://cornerstone-light-demo.mybigcommerce.com')
        cy.get('#consent-manager').contains('Accept All Cookies').click()
        cy.get('[data-test="card-86"]').realHover().within(() => {
            cy.get('[data-button-type="add-cart"]').click()
        })
        cy.get('[data-primary-checkout-now-action]').click()

        const uuid = () => Cypress._.random(0, 1e6)
        const id = uuid()
        const testname = `testname${id}`

        cy.get("[type='email']").type(testname + '@somedomain.com')
        cy.get('#privacyPolicy').check({force: true})
        cy.get('#checkout-customer-continue').click()

        cy.get('[data-test="countryCodeInput-select"]').select('GB')
        cy.get('[data-test="firstNameInput-text"]').type('First Name')
        cy.get('[data-test="lastNameInput-text"]').type('Last Name')
        cy.get('[data-test="addressLine1Input-text"]').type('1, Test Street')
        cy.get('[data-test="cityInput-text"]').type('London')
        cy.get('[data-test="phoneInput-text"]').type('07866432135')
        cy.get('[data-test="postCodeInput-text"]').type('NW1 2FB')

        cy.wait(3000)
        cy.get('#checkout-shipping-continue').click()

        cy.get('#ccNumber').type('4111 1111 1111 1111')
        cy.get('#ccName').type('Test User')
        cy.get('#ccExpiry').type('0427')
        cy.get('#ccCvv').type('411')
        cy.get('#checkout-payment-continue').click()

        cy.get('[data-test="order-confirmation-heading"]').should('be.visible')
        cy.get('[data-test="order-confirmation-order-number-text"]').should('be.visible')
    })
})