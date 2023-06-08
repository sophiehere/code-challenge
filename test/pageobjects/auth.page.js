const {fetchVerificationCodeFromOutlook} = require("../utility/imapUtil");
const {outlookPassword, outlookUsername} = require("../data/config");

/**
 * class containing specific selectors and methods for Auth Page
 */
class AuthPage {

    get pageTitle() {
        return $('#wizardTitle-text');
    }

    get sendCodeBtn() {
        return $('#twoFactor-step1-next-button');
    }

    get verifyAndLoginBtn() {
        return $('#twoFactor-step2-next-button');
    }

    get verificationInput() {
        return $('#twoFactor-step2-code-input');
    }

    async sendCode() {
        await this.pageTitle.waitForDisplayed({timeout:5000});
        await this.sendCodeBtn.click();
    }

    async verifyIdentity() {
        const verificationCode = await this.getVerificationCode();
        await console.log(verificationCode);
        await this.verificationInput.setValue(verificationCode);
        await this.verifyAndLoginBtn.click();
    }

    /**
     * Get the verification code from outlook
     */
    async getVerificationCode () {
        await browser.pause(5000);
        try {
            const verificationCode = await fetchVerificationCodeFromOutlook(
                outlookUsername,
                outlookPassword
            );
            console.log('Verification code:', verificationCode);
            return verificationCode.toString();
        } catch (error) {
            console.error('Error fetching verification code:', error);
        }
    }
}

module.exports = new AuthPage();