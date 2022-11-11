const { Given, When, Then } = require('@cucumber/cucumber');
const {faker} = require("@faker-js/faker");
const expect = require('chai').expect;
const returns = {}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}



Given('I navigate to ghost admin', async function () {
    await this.driver.navigateTo("http://uniandes.ingenio.com.co:2368/ghost");
    return await delay(5000)
});

Given('I navigate to ghost website', async function () {
    await this.driver.navigateTo("http://uniandes.ingenio.com.co:2368");
    return await delay(5000)
});

Given('I check that the title has changed', async function () {
    const currentTitle = await this.driver.getTitle();
    expect(currentTitle).equal(returns['newTitle'])
    return await delay(5000)
});

When('I login into the administrator', async function () {
    const username = 'jfdeviar@gmail.com'
    const password = 'pt100UNAL--'

    const emailElement = await this.driver.$("input.email");
    await emailElement.setValue(username);

    const passwordElement = await this.driver.$("input.password");
    await passwordElement.setValue(password);

    const loginButtonElement = await this.driver.$("button.login");
    await loginButtonElement.click()
    return await delay(5000)
});

When('I save general settings changes', async function () {
    await this.driver.$(".view-actions button").click();
    return await delay(5000)
})
When('I go into settings', async function () {
    let element = await this.driver.$('.gh-nav-bottom a[href="#/settings/"]');
    await element.click()
    return await delay(5000)
})

When('I go into general settings', async function () {
    let element = await this.driver.$('.gh-main a[href="#/settings/general/"]');
    await element.click()
    return await delay(5000)
})

When('I expand the {string} section', async function (section) {
    let elements = await this.driver.$$('.gh-expandable-block');
    const filtered = []
     for(const element of Object.values(elements)){
        try {
            if(typeof element === 'object'){
                const text = await this.driver.$(element).getText()
                if (text.toLowerCase().includes(section.toLowerCase())){
                    filtered.push(element)
                }
            }

        } catch (e){}

    }
    expect(filtered.length).to.equal(1);
    await this.driver.$(filtered[0]).$('button.gh-btn').click()
    return await delay(5000)
})

When('I fill the input in the position {int} in the expanded section', async function (position) {
    let elements = await this.driver.$$('.gh-expandable-content input');
    let filtered = null
    let currentIndex = 1
    for(const element of Object.values(elements)){
        try {
            if(typeof element === 'object'){
                if (currentIndex === position){
                    filtered = element
                }
                currentIndex++
            }

        } catch (e){}

    }

    returns['newTitle'] = faker.lorem.words(3)
    await this.driver.$(filtered).setValue(returns['newTitle'])
    return await delay(5000)
})

When('I change title admin website with random text', async function () {
    let elements = await this.driver.$$('.gh-expandable-block');
    const filtered = []
    for(const element of Object.values(elements)){
        try {
            if(typeof element === 'object'){
                const text = await this.driver.$(element).getText()
                if (text.toLowerCase().includes('')){
                    filtered.push(element)
                }
            }

        } catch (e){}

    }
    expect(filtered.length).to.equal(1);
    await this.driver.$(filtered[0]).$('button.gh-btn').click()
    return await delay(5000)
})

When('I go into posts', async function () {
    let element = await this.driver.$('.gh-nav-top a[href="#/posts/"]');
    await element.click()
    return await delay(5000)
});
