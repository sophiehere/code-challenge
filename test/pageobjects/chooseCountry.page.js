/**
 * class containing specific selectors and methods for Choose Country Page
 */
class ChooseCountryPage {
    get countrySelect () {
        return $('#country-select');
    }

    get languageSelect () {
        return $('#language-select');
    }

    get btnSubmit () {
        return $('#submit-button');
    }

    get libreHeader () {
        return $('#app-logo');
    }

    async submitCountryAndLanguage(countryValue, langValue){
        await this.libreHeader.waitForDisplayed({timeout:5000});
        await this.countrySelect.waitForClickable({timeout:5000});
        await this.countrySelect.selectByAttribute("value", countryValue);
        await this.languageSelect.selectByAttribute("value", langValue);
        await this.btnSubmit.click();
    }
}

module.exports = new ChooseCountryPage();