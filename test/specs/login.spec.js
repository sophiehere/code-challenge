const LoginPage = require('../pageobjects/login.page');
const AuthPage = require('../pageobjects/auth.page');
const ResultsPage = require('../pageobjects/glucoseReports.page');

const username = 'codechallengeadc@outlook.com';
const password = 'P@ssword$12';

describe('Sign-up Test', () => {
    beforeEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;
        setTimeout(function () {
            console.log('inside timeout');
        }, 500);
    });
    it('should successfully sign up a new user', async () => {
        await LoginPage.login(username, password);
        await AuthPage.sendCode();
        // Assert Verify and Login button is disabled
        await expect(AuthPage.verifyAndLoginBtn.getAttribute('disabled')).toBeTruthy();
        await AuthPage.verifyIdentity();
        // // Assert Results page contains press to begin button
        await expect(ResultsPage.uploadDeviceBtn).toBeClickable();
    });
});