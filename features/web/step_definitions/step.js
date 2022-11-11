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

When('I check that the menu to {string} has been added', async function (url) {
    const elements = await this.driver.$$('.nav a[href="'+url+'"]');
    expect(elements.length).to.equal(1);
    return await delay(5000)
})

When('I go into settings', async function () {
    let element = await this.driver.$('.gh-nav-bottom a[href="#/settings/"]');
    await element.click()
    return await delay(5000)
})

When('I add a menu to {string} with label {string} as a new element in {string} navigation', async function (url,label,navigation) {
    const navigationLinks = {'primary': '#settings-navigation', 'secondary':'#secondary-navigation'}

    const elementLabel = this.driver.$(navigationLinks[navigation] + " .gh-blognav-item:not(.gh-blognav-item--sortable) input[placeholder='Label']")
    await elementLabel.setValue(label)


    const elementURL = this.driver.$(navigationLinks[navigation] + " .gh-blognav-item:not(.gh-blognav-item--sortable) input:not([placeholder='Label'])")
    await elementURL.setValue(url)

    return await delay(5000)
})

When('I check the last menu item in {string} navigation', async function (navigation) {
    const navigationLinks = {'primary': '.gh-head-menu', 'secondary':'.gh-foot-menu'}
    const elementsURL = this.driver.$$(navigationLinks[navigation]+" .nav li:last-child a")
    const menuElements = this.driver.$$(navigationLinks[navigation]+" .nav li")

    const elementsHrefs = []
    for (const elementURL of elementsURL){
        elementsHrefs.push(elementURL.getAttribute('href'))
    }

    returns['last-item-link'] = {totalElements: menuElements.length, elementsHrefs}
    return await delay(5000)
})

When('I remove the last menu item in {string} navigation', async function (navigation) {
    const navigationLinks = {'primary': '#settings-navigation', 'secondary':'#secondary-navigation'}

    const elementLabel = this.driver.$(navigationLinks[navigation] + " .sortable-objects .draggable-object:last-child button.gh-blognav-delete")
    await elementLabel.click()

    return await delay(5000)
})

When('I check that the last menu item was deleted in the {string} navigation', async function (navigation) {
    const navigationLinks = {'primary': '.gh-head-menu', 'secondary':'.gh-foot-menu'}

    const elementsURL = this.driver.$$(navigationLinks[navigation]+" .nav li a")
    const menuElements = this.driver.$$(navigationLinks[navigation]+" .nav li")

    for (let i = 0; i< elementsURL.length;i++)
    {
        expect(returns['last-item-link'].elementsHrefs[i]).to.equal(elementsURL[i].getAttribute('href'));
    }

    expect(menuElements.length).to.equal(returns['last-item-link'].totalElements);
    return await delay(5000)
})


When('I go into {string} settings', async function (settings) {
    const element = await this.driver.$('.gh-main a[href="#/settings/'+settings+'/"]');
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
