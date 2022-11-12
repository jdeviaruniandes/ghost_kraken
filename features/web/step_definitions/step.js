const { Given, When, Then } = require('@cucumber/cucumber');
const {faker} = require("@faker-js/faker");
const expect = require('chai').expect;
const returns = {}




async function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function searchableElementIncluding(driver, elements, target) {
    const filtered = []
    for(const element of Object.values(elements)) {
        try {
            if (typeof element === 'object') {
                const text = await driver.$(element).getText()
                if (text.toLowerCase().includes(target.toLowerCase())) {
                    filtered.push(element)
                }
            }

        } catch (e) {}
    }
    return filtered
}

Given('I navigate to ghost admin', async function () {
    await this.driver.navigateTo("http://uniandes.ingenio.com.co:2368/ghost");
    return await delay(5000)
});

Given('I open menu invite people', async function () {
    await this.driver.$(".view-actions button.gh-btn-primary").click()
    return await delay(5000)
})


Given('I fill the input with id selector {string} with {string}', async function (inputId,email) {
    await this.driver.$(inputId).setValue(email)
    return await delay(5000)
})

Given('I fill the bio with faker with {string} words', async function (words) {
    returns["bio"] = faker.lorem.words(parseInt(words))
    await this.driver.$("#user-bio").setValue(returns["bio"])
    return await delay(5000)
})

Given('I select the option {string} in the invite a new staff modal', async function (target) {
    let elements = await this.driver.$$('.gh-roles-container .gh-radio .gh-radio-label');
    const filtered = await searchableElementIncluding(this.driver,elements,target)
    expect(filtered.length).to.equal(1);
    await this.driver.$(filtered[0]).click()
    return await delay(5000)
})


Given('I refresh the website', async function () {
    await this.driver.refresh()
    return await delay(5000)
})

Given('I check that the invitation has been deleted', async function () {
    let elements = await this.driver.$$('.apps-configured a[href="#revoke"]');
    expect(elements.length).to.equal(returns['invitations']-1)
    return await delay(5000)
})

Given('I see an error saying {string} in the {string} field', async function (response,field) {
    let elements = await this.driver.$$(field);
    const filtered = await searchableElementIncluding(this.driver, elements, response)

    expect(filtered.length).equal(1)
    return await delay(5000)
})

Given('I revoke the invitation', async function () {
    let elements = await this.driver.$$('.apps-configured a[href="#revoke"]');
    returns['invitations'] = elements.length

    await this.driver.$('.apps-configured a[href="#revoke"]').click()
    return await delay(5000)
});




Given('I navigate to ghost website', async function () {
    await this.driver.navigateTo("http://uniandes.ingenio.com.co:2368");
    return await delay(5000)
});

Given('I am logged in the admin section', async function () {
    const currentUrl = await this.driver.getUrl()
    console.log(currentUrl)
    expect(currentUrl).equal('http://uniandes.ingenio.com.co:2368/ghost/#/dashboard')
})

Given('I logout admin', async function () {
    const elementNotification = await this.driver.$$(".gh-notification-close");
    if (elementNotification.length > 0){
        await this.driver.$(".gh-notification-close").click();
    }

    await this.driver.$(".gh-nav-bottom .gh-user-avatar").click();
    await delay(1000)
    await this.driver.$(".user-menu-signout").click();
    return await delay(5000)
});

Given('I send the invitation mail', async function () {
    let element = await this.driver.$('.modal-footer button').click();
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

When('I go to my profile', async function (){
    let element = await this.driver.$('div.gh-user-avatar');
    await element.click();
    let secondElement = await this.driver.$('li a[href="#/settings/staff/johnattan/"]');
    await secondElement.click()
    return await delay(5000)
})

When('I save the profile changes', async function (){
    await this.driver.$('button.gh-btn-primary').click();
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
    const elementsURL = await this.driver.$$(navigationLinks[navigation]+" .nav li:last-child a")
    const menuElements = await this.driver.$$(navigationLinks[navigation]+" .nav li")

    const elementsHrefs = []
    for (const elementURL of elementsURL){
        try {
            if (typeof elementURL === 'object') {
                elementsHrefs.push(await this.driver.$(elementURL).getAttribute('href'))
            }
        } catch (e){}
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

    const elementsURL = await this.driver.$$(navigationLinks[navigation]+" .nav li a")
    const menuElements = await this.driver.$$(navigationLinks[navigation]+" .nav li")

    for (let i = 0; i< elementsURL.length;i++)
    {
        try {
            if (typeof elementsURL[i] === 'object') {
                expect(returns['last-item-link'].elementsHrefs[i]).to.equal(await this.driver.$(elementsURL[i]).getAttribute('href'));
            }
        } catch (e){}
    }

    expect(menuElements.length).to.equal(returns['last-item-link'].totalElements-1);
    return await delay(5000)
})


When('I go into {string} settings', async function (settings) {
    const element = await this.driver.$('.gh-main a[href="#/settings/'+settings+'/"]');
    await element.click()
    return await delay(5000)
})



When('I expand the {string} section', async function (target)
{
    let elements = await this.driver.$$('.gh-expandable-block');
    const filtered = await searchableElementIncluding(this.driver,elements,target)
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

When('I go into {string}', async function (section) {
    let element = await this.driver.$('.gh-nav-top a[href="#/'+section+'/"]');
    await element.click()
    return await delay(5000)
});

Then("I check that the full name is {string}", async function (newFullNameProfile){
    newProfileNameWeb = await this.driver.$("h2.gh-canvas-title").getText()
    expect(newFullNameProfile).equal(newProfileNameWeb)
    return await delay(5000);
})


When('I enter {string} to the input with class {string}', async function (value,inputClass) {
    let element =  await this.driver.$(`input.${inputClass}`);
    await element.click();
    await element.setValue(value);
    return await delay(5000)
})

When('I relog page without save', async function () {
    const currentUrl = await this.driver.getUrl()
    await this.driver.navigateTo(currentUrl);
    return await delay(5000)
})

When('I try to change password', async function () {
    let element =  await this.driver.$('button.button-change-password');
    await element.click();
    return await delay(5000)
})

Then("I check the error message {string}", async function (error){
    let elements = await this.driver.$$('p.response');
    const filtered = await searchableElementIncluding(this.driver,elements,error)
    expect(filtered.length).to.equal(1);
    return await delay(5000);
})


Then("I check the Bio is updated", async function (){
    let text = await this.driver.$("textarea.gh-input").getText();
    expect(returns["bio"]).to.include(text);
    return await delay(5000);
})