const Page = require('./page');
const ChooseCountryPage = require('./chooseCountry.page')
const cookieConsent = require('./../alerts/cookieConsent')
const {config} = require("../../wdio.conf");

/**
 * class containing specific selectors and methods for a login page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return $('#loginForm-email-input');
    }

    get inputPassword () {
        return $('#loginForm-password-input');
    }

    get btnLogin () {
        return $('#loginForm-submit-button');
    }

    /**
     * login method
     * e.g. to login using username and password
     */
    async login (username, password) {
        await super.open();
        await cookieConsent.acceptCookies();
        await ChooseCountryPage.submitCountryAndLanguage('US', 'en-US');
        await this.inputUsername.waitForDisplayed({timeout:5000});
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
    }
}

module.exports = new LoginPage();
