/**
 * class containing specific selectors and methods for Glucose Reports Page
 */
class GlucoseReportsPage {
    get uploadDeviceBtn() {
        return $('#uploadCard-upload-button');
    }
}

module.exports = new GlucoseReportsPage();