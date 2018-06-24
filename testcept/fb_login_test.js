
Feature('Testing fb login');

Scenario('test something', (I) => {
    I.amOnPage('/login/facebook');
    I.fillField('input#email', 'droidmakk');
    I.fillField('input#pass', 'afroze@5001');
    I.click('button#loginbutton');
    I.see('Logged in from facebook!');
    I.refreshPage();
    I.see('Hurray! logged in using facebook session!');
});
