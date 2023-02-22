import homePage from "../pageObjects/homePage"
import cartPage from "../pageObjects/cartPage"
import checkoutPage from "../pageObjects/checkoutPage"
import consentManager from "../pageObjects/consentManager"
import orderConfirmationPage from "../pageObjects/orderConfirmationPage"

Cypress.Commands.add('addProductToCart', (product) => {
    cy.get(product).realHover().within(() => {
        cy.get(homePage.addCartButton).click()
    })
});

Cypress.Commands.add('enterNewCustomerDetails', () => {
    const uuid = () => Cypress._.random(0, 1e6);
    const id = uuid();
    const randomUser = `user${id}`;

    cy.get(checkoutPage.emailBox).type(randomUser + '@somedomain.com')
    cy.get(checkoutPage.privacyPolicyCheckbox).check({force: true})
    cy.get(checkoutPage.customerAsGuestContinuebutton).click()
});

Cypress.Commands.add('enterShippingDetails', (countryCode, firstName, lastName, addressLine, city, postalCode, phoneNumber) => {
    cy.get(checkoutPage.country).select(countryCode)
    cy.get(checkoutPage.firstName).type(firstName)
    cy.get(checkoutPage.lastName).type(lastName)
    cy.get(checkoutPage.address).type(addressLine)
    cy.get(checkoutPage.city).type(city)
    cy.get(checkoutPage.phoneNumber).type(phoneNumber)
    cy.get(checkoutPage.postalCode).type(postalCode)
});

Cypress.Commands.add('enterBillingDetails', (creditcardNumber, nameOnCard, expirationDate, cvv) => {
    cy.get(checkoutPage.creditcardNumber).type(creditcardNumber)
    cy.get(checkoutPage.nameOnCard).type(nameOnCard)
    cy.get(checkoutPage.expirationDate).type(expirationDate)
    cy.get(checkoutPage.cvv).type(cvv)
});

Cypress.Commands.add('placeOrder', () => {
    cy.get(checkoutPage.placeOrderButton).click()
});

Cypress.Commands.add('assertOrderIsConfirmed', () => {
    cy.get(orderConfirmationPage.heading).contains('Thank you');
    cy.get(orderConfirmationPage.orderNumberText).should('be.visible')
});

Cypress.Commands.add('checkoutCart', () => {
    cy.get(cartPage.checkoutButton).click()
});

Cypress.Commands.add('continueWithShippingMethod', () => {
    cy.get(checkoutPage.checkoutShippingContinueButton).click()
});

Cypress.Commands.add('setCookiePreferenceAs', (cookiePreferenceOption) => {
    cy.get(consentManager.id).contains(cookiePreferenceOption).click()
});