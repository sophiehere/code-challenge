/**
 * class containing specific selectors and methods for cookie consent banner
 */
class CookieConsent {
    get cookieConsentCloseBtn () {
        return $('#truste-consent-close');
    }

    async acceptCookies(){
        await this.cookieConsentCloseBtn.waitForClickable({timeout:5000});
        await this.cookieConsentCloseBtn.click();
    }
}

module.exports = new CookieConsent();