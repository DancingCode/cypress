import cartPage from "../pageObjects/cartPage"
import checkoutPage from "../pageObjects/checkoutPage"
import consentManager from "../pageObjects/consentManager"
import homePage from "../pageObjects/homePage"
import oroderConfirmationPage from "../pageObjects/oroderConfirmationPage"

describe('On completing checkout', () => {
    it('should present a purchase confirmation page for my order', () => {
        cy.visit('/')
        cy.get(consentManager.id).contains('Accept All Cookies').click()
        cy.get(homePage.productCard86).realHover().within(() => {
            cy.get(homePage.addCartButton).click()
        })

        cy.get(cartPage.checkoutButton).click()

        const uuid = () => Cypress._.random(0, 1e6)
        const id = uuid()
        const testname = `testname${id}`

        cy.get(checkoutPage.emailBox).type(testname + '@somedomain.com')
        cy.get(checkoutPage.privacyPolicyCheckbox).check({force: true})
        cy.get(checkoutPage.customerAsGuestContinuebutton).click()

        cy.get(checkoutPage.country).select('GB')
        cy.get(checkoutPage.firstName).type('First Name')
        cy.get(checkoutPage.lastName).type('Last Name')
        cy.get(checkoutPage.address).type('1, Test Street')
        cy.get(checkoutPage.city).type('London')
        cy.get(checkoutPage.phoneNumber).type('07866432135')
        cy.get(checkoutPage.postalCode).type('NW1 2FB')

        cy.wait(5000)
        cy.get(checkoutPage.checkoutShippingContinueButton).click()

        cy.get(checkoutPage.creditcardNumber).type('4111 1111 1111 1111')
        cy.get(checkoutPage.nameOnCard).type('Test User')
        cy.get(checkoutPage.expirationDate).type('0427')
        cy.get(checkoutPage.cvv).type('411')
        cy.get(checkoutPage.placeOrderButton).click()

        cy.get(oroderConfirmationPage.heading).contains('Thank you');
        cy.get(oroderConfirmationPage.orderNumberText).should('be.visible')
    })
})