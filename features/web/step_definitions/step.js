const { Given, When, Then } = require('@cucumber/cucumber');


When('I navigate to ghost admin', async function () {
    return await this.driver.navigateTo("http://uniandes.ingenio.com.co:2368/ghost");
});