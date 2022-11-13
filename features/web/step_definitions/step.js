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
//#region Post funct
Given('I select new post', async function () {
    let element = await this.driver.$("a.ember-view.gh-btn");
    await element.click();
    return await delay(5000)
})

Given('I fill the post title with {string} and description with {string}', async function (title, description) {
   let textArea = await this.driver.$('textarea.gh-editor-title')
   await textArea.click();
   await textArea.setValue(title);
   await delay(3000)
   let descriptionHTML = await this.driver.$('article.koenig-editor')
   await descriptionHTML.click();
   await descriptionHTML.setValue(description);
   return await delay(5000)
})

Given('I fill the post title with random title', async function () {
    let textArea = await this.driver.$('textarea.gh-editor-title')
    await textArea.click();
    let randTitle = faker.name.jobTitle()
    await textArea.setValue(randTitle);
    returns['randomPostTitle'] = randTitle
    return await delay(5000)
 })

Given('I select last post published',async function () {
    let element = await this.driver.$("div.gh-contentfilter-type");
    await element.click();
    await delay(1000)
    element = await this.driver.$$("li.ember-power-select-option");
    const filtered = await searchableElementIncluding(this.driver,element,'Published posts')
    expect(filtered.length).to.equal(1);
    await this.driver.$(filtered[0]).click()
    await delay(1000)
    element = await this.driver.$("h3.gh-content-entry-title");
    await element.click();
    return await delay(5000)
})

When('I publish the post', async function () {
    let element = await this.driver.$("button.gh-publish-trigger");
    await element.click();
    await delay(1000)
    element = await this.driver.$("button.gh-btn.gh-btn-black.gh-btn-large");
    await element.click();
    await delay(1000)
    element = await this.driver.$("button.gh-btn.gh-btn-pulse");
    await element.click();
    await delay(1000)
    element = await this.driver.$("div.gh-post-bookmark-container");
    await element.click();
    return await delay(5000)
})

When('I edit the post', async function () {
    let element = await this.driver.$("button.gh-editor-save-trigger");
    await element.click();
    await delay(1000)
    element = await this.driver.$("span.gh-notification-actions a");
    await element.click();
    await delay(5000)
})

Then('I Check post has title {string} and description {string}', async function (title, description) {
    let titleHtml = await this.driver.$("h1.single-title")
    let descHtml = await this.driver.$("div.single-content p")
    expect(await titleHtml.getText()).equal(title)
    expect(await descHtml.getText()).equal(description)
    return await delay(5000)
})

Then('I Check post has the random title', async function () {
    let titleHtml = await this.driver.$("h1.single-title")
    expect(await titleHtml.getText()).equal(returns['randomPostTitle'])
    return await delay(5000)
})

//#endregion

//#region Tag funct
Given('I select new tag', async function () {
    let element = await this.driver.$('a.ember-view.gh-btn.gh-btn-primary')
    element.click()
    await delay(3000)
 })

 Given('I select existing tag',async function () {
    let element = await this.driver.$('a.ember-view.gh-list-data.gh-tag-list-title')
    element.click()
    await delay(3000)
 })


When('I fill tag with random name and description', async function () {
    let element = await this.driver.$('#tag-name')
    const randTitle = faker.name.jobTitle()
    returns['randomTagTitle'] = randTitle
    element.setValue(randTitle)
    await delay(3000)

    element = await this.driver.$('#tag-description')
    const randDescription = faker.name.jobDescriptor()
    returns['randomTagDescription'] = randDescription
    element.setValue(randDescription)
    await delay(3000)

    element = await this.driver.$('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view')
    element.click()
    return await delay(5000)
 })

 When('I delete the tag', async function () {
    let element = await this.driver.$('h2.gh-canvas-title')
    returns['deletedTag'] = await element.getText()

    element = await this.driver.$('button.gh-btn.gh-btn-red.gh-btn-icon')
    element.click()
    await delay(3000)

    element = await this.driver.$('button.gh-btn.gh-btn-red.gh-btn-icon.ember-view')
    element.click()
    await delay(5000)
 })

 Then('I chek tag with random name exists and has description', async function (){
    const titles= await this.driver.$$('h3.gh-tag-list-name')
    let filtered = await searchableElementIncluding(this.driver,titles,returns["randomTagTitle"])
    expect(filtered.length).to.equal(1);
    expect(await filtered[0].getText()).to.equal(returns["randomTagTitle"]);

    const descriptions = await this.driver.$$('p.gh-tag-list-description')
    filtered = await searchableElementIncluding(this.driver,descriptions,returns["randomTagDescription"])
    expect(await filtered[0].getText()).to.equal(returns["randomTagDescription"]);

    return await delay(5000)
 })

 Then('I chek tag doest not exists', async function (){
    const titles= await this.driver.$$('h3.gh-tag-list-name')
    let filtered = await searchableElementIncluding(this.driver,titles,returns["deletedTag"])
    expect(filtered.length).to.equal(0);
    return await delay(5000)
 })


//#endregion
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

//#region Post funct
Given('I select new post', async function () {
    let element = await this.driver.$("a.ember-view.gh-btn");
    await element.click();
    return await delay(5000)
})

Given('I fill the post title with {string} and description with {string}', async function (title, description) {
   let textArea = await this.driver.$('textarea.gh-editor-title')
   await textArea.click();
   await textArea.setValue(title);
   await delay(3000)
   let descriptionHTML = await this.driver.$('article.koenig-editor')
   await descriptionHTML.click();
   await descriptionHTML.setValue(description);
   return await delay(5000)
})

Given('I fill the post title with random title', async function () {
    let textArea = await this.driver.$('textarea.gh-editor-title')
    await textArea.click();
    let randTitle = faker.name.jobTitle()
    await textArea.setValue(randTitle);
    returns['randomPostTitle'] = randTitle
    return await delay(5000)
 })

Given('I select last post published',async function () {
    let element = await this.driver.$("div.gh-contentfilter-type");
    await element.click();
    await delay(1000)
    element = await this.driver.$$("li.ember-power-select-option");
    const filtered = await searchableElementIncluding(this.driver,element,'Published posts')
    expect(filtered.length).to.equal(1);
    await this.driver.$(filtered[0]).click()
    await delay(1000)
    element = await this.driver.$("h3.gh-content-entry-title");
    await element.click();
    return await delay(5000)
})

When('I publish the post', async function () {
    let element = await this.driver.$("button.gh-publish-trigger");
    await element.click();
    await delay(1000)
    element = await this.driver.$("button.gh-btn.gh-btn-black.gh-btn-large");
    await element.click();
    await delay(1000)
    element = await this.driver.$("button.gh-btn.gh-btn-pulse");
    await element.click();
    await delay(1000)
    element = await this.driver.$("div.gh-post-bookmark-container");
    await element.click();
    return await delay(5000)
})

When('I edit the post', async function () {
    let element = await this.driver.$("button.gh-editor-save-trigger");
    await element.click();
    await delay(1000)
    element = await this.driver.$("span.gh-notification-actions a");
    await element.click();
    await delay(5000)
})

Then('I Check post has title {string} and description {string}', async function (title, description) {
    let titleHtml = await this.driver.$("h1.single-title")
    let descHtml = await this.driver.$("div.single-content p")
    expect(await titleHtml.getText()).equal(title)
    expect(await descHtml.getText()).equal(description)
    return await delay(5000)
})

Then('I Check post has the random title', async function () {
    let titleHtml = await this.driver.$("h1.single-title")
    expect(await titleHtml.getText()).equal(returns['randomPostTitle'])
    return await delay(5000)
})

//#endregion

//#region Tag funct
Given('I select new tag', async function () {
    let element = await this.driver.$('a.ember-view.gh-btn.gh-btn-primary')
    element.click()
    await delay(3000)
 })

 Given('I select existing tag',async function () {
    let element = await this.driver.$('a.ember-view.gh-list-data.gh-tag-list-title')
    element.click()
    await delay(3000)
 })


When('I fill tag with random name and description', async function () {
    let element = await this.driver.$('#tag-name')
    const randTitle = faker.name.jobTitle()
    returns['randomTagTitle'] = randTitle
    element.setValue(randTitle)
    await delay(3000)

    element = await this.driver.$('#tag-description')
    const randDescription = faker.name.jobDescriptor()
    returns['randomTagDescription'] = randDescription
    element.setValue(randDescription)
    await delay(3000)

    element = await this.driver.$('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view')
    element.click()
    return await delay(5000)
 })

 When('I delete the tag', async function () {
    let element = await this.driver.$('h2.gh-canvas-title')
    returns['deletedTag'] = await element.getText()

    element = await this.driver.$('button.gh-btn.gh-btn-red.gh-btn-icon')
    element.click()
    await delay(3000)

    element = await this.driver.$('button.gh-btn.gh-btn-red.gh-btn-icon.ember-view')
    element.click()
    await delay(5000)
 })

 Then('I chek tag with random name exists and has description', async function (){
    const titles= await this.driver.$$('h3.gh-tag-list-name')
    let filtered = await searchableElementIncluding(this.driver,titles,returns["randomTagTitle"])
    expect(filtered.length).to.equal(1);
    expect(await filtered[0].getText()).to.equal(returns["randomTagTitle"]);

    const descriptions = await this.driver.$$('p.gh-tag-list-description')
    filtered = await searchableElementIncluding(this.driver,descriptions,returns["randomTagDescription"])
    expect(await filtered[0].getText()).to.equal(returns["randomTagDescription"]);

    return await delay(5000)
 })

 Then('I chek tag doest not exists', async function (){
    const titles= await this.driver.$$('h3.gh-tag-list-name')
    let filtered = await searchableElementIncluding(this.driver,titles,returns["deletedTag"])
    expect(filtered.length).to.equal(0);
    return await delay(5000)
 })


//#endregion

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

//#region newsletter

Given('I select add newsletter', async function () {
    let element = await this.driver.$('a.ember-view.gh-add-newsletter')
    element.click()
    await delay(3000)
 })

Given('I fill the input with id selector name {string} with {string}', async function (inputId,name) {
    await this.driver.$(inputId).setValue(name)
    return await delay(5000)
})

Given('I fill the input with id selector description {string} with {string}', async function (inputId,description) {
    await this.driver.$(inputId).setValue(description)
    return await delay(5000)
})

Then('I select create', async function () {
    let element = await this.driver.$('button.gh-btn-primary');
    element.click()
    await delay(3000)
 })

Then('I select cancel', async function () {
    let element = await this.driver.$('button.gh-btn').click();
    return await delay(5000)
});

//#region pages

Given('I select new page', async function () {
    let element = await this.driver.$("a.ember-view.gh-btn")
    element.click()
    await delay(3000)
 })


Given('I fill the page title with {string} and description with {string}', async function (title, description) {
    let textArea = await this.driver.$('textarea.gh-editor-title')
    await textArea.click();
    await textArea.setValue(title);
    await delay(3000)
    let descriptionHTML = await this.driver.$('article.koenig-editor')
    await descriptionHTML.click();
    await descriptionHTML.setValue(description);
    return await delay(5000)
 })
 

When('I select publish', async function () {
    let element = await this.driver.$("button.gh-publish-trigger");
    await element.click();
    await delay(1000)
    element = await this.driver.$("button.gh-btn.gh-btn-black.gh-btn-large");
    await element.click();
    await delay(1000)
    element = await this.driver.$("button.gh-btn.gh-btn-pulse");
    await element.click();
    await delay(1000)
    element = await this.driver.$("div.gh-page-bookmark-container");
    await element.click();
    return await delay(5000)
})

Then('I Check page has title {string} and description {string}', async function (title, description) {
    let titleHtml = await this.driver.$("h1.single-title")
    let descHtml = await this.driver.$("div.single-content p")
    expect(await titleHtml.getText()).equal(title)
    expect(await descHtml.getText()).equal(description)
    return await delay(5000)
})

Then('I select pages', async function () {
    let element = await this.driver.$("a.ember-view.gh-btn-editor")
    element.click()
    await delay(3000)
 })

Given('I select last page published',async function () {
    let element = await this.driver.$("div.gh-contentfilter-type");
    await element.click();
    await delay(1000)
    element = await this.driver.$$("li.ember-power-select-option");
    const filtered = await searchableElementIncluding(this.driver,element,'Published page')
    expect(filtered.length).to.equal(1);
    await this.driver.$(filtered[0]).click()
    await delay(1000)
    element = await this.driver.$("h3.gh-content-entry-title");
    await element.click();
    return await delay(5000)
})

Given('I fill the page title with random title', async function () {
    let textArea = await this.driver.$('textarea.gh-editor-title')
    await textArea.click();
    let randTitle = faker.name.jobTitle()
    await textArea.setValue(randTitle);
    returns['randomPageTitle'] = randTitle
    return await delay(5000)
 })

When('I edit the page', async function () {
    let element = await this.driver.$("button.gh-editor-save-trigger");
    await element.click();
    await delay(1000)
    element = await this.driver.$("span.gh-notification-actions a");
    await element.click();
    await delay(5000)
})

Then('I Check page has the random title', async function () {
    let titleHtml = await this.driver.$("h1.single-title")
    expect(await titleHtml.getText()).equal(returns['randomPageTitle'])
    return await delay(5000)
})
