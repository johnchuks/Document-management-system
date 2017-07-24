import faker from 'faker';
import config from './config';

const fullName = faker.name.findName();
const userName = faker.internet.userName();
const email = faker.internet.email();
const password = faker.internet.password();
export default {
  'Sign up a user': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('#navSignup')
      .click('#navSignup')
      .setValue('input[name=fullName]', fullName)
      .setValue('input[name=userName]', userName)
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .click('#signupButton')
      .waitForElementVisible('h5.all-documents')
      .click('a#navLogout')
      .waitForElementVisible('div#navLogin')
      .assert.containsText('#navLogin', 'DocumentME')
      .end(),

  'Invalid signup': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#navSignup')
      .click('#signupButton')
      .waitForElementVisible('div.toast-message')
      .assert.containsText('div.toast-message', 'All fields are required')
      .end(),

  'Sign a user in successfully': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('#navLogin')
      .setValue('input[name=email]', 'johnbosco.ohia@andela.com')
      .setValue('input[name=password]', 'adminpassword')
      .click('#loginButton')
      .waitForElementVisible('h5.all-documents')
      .click('a#navLogout')
      .waitForElementVisible('div#navLogin')
      .assert.containsText('#navLogin', 'DocumentME'),

  'Login with invalid crendentials': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .setValue('input[name=email]', 'baddest@ogbeni.com')
      .setValue('input[name=password]', 'baddest')
      .click('#loginButton')
      .waitForElementVisible('div.toast-message')
      .assert.containsText('.toast-message', 'This account does not exist'),

  'Login without the required fields': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .setValue('input[name=email', '')
      .setValue('input[name=password]', '')
      .click('#loginButton')
      .waitForElementVisible('div.toast-message')
      .assert.containsText('div.toast-message', 'All fields are required'),

  'Update a user': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .setValue('input[name=email]', 'mayowa@gmail.com')
      .setValue('input[name=password]', 'mayor')
      .click('#loginButton')
      .waitForElementVisible('h5.all-documents')
      .click('.button-collapse')
      .click('#editprofileNav')
      .waitForElementVisible('h4.searchHeading')
      .assert.containsText('h4.searchHeading', 'Edit Profile')
      .setValue('input[name=fullName]', 'john chukwuemeka')
      .setValue('input[name=userName]', 'oj811')
      .click('button#editButton')
      .waitForElementVisible('div.toast-message')
      .click('.button-collapse')
      .waitForElementVisible('span#welcomeName')
      .end(),

  'Delete a user as an admin': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .setValue('input[name=email]', 'johnbosco.ohia@andela.com')
      .setValue('input[name=password]', 'adminpassword')
      .click('#loginButton')
      .waitForElementVisible('h5.all-documents')
      .click('.button-collapse')
      .click('a#manageusersNav')
      .waitForElementVisible('h5.manage-users')
      .assert.containsText('h5.manage-users', 'Manage Users')
      .click('li.next')
      .waitForElementVisible('button#deleteUserButton')
      .click('button#deleteUserButton')
      .waitForElementVisible('div.modal-content')
      .assert.containsText(
        'div.modal-content',
        'Are you sure you want to delete this user'
      )
      .click('button#noButton'),

  'Search for users': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .setValue('input[name=email]', 'johnbosco.ohia@andela.com')
      .setValue('input[name=password]', 'adminpassword')
      .click('#loginButton')
      .waitForElementVisible('h5.all-documents')
      .click('.button-collapse')
      .click('a#searchuserNav')
      .waitForElementVisible('h4.search-heading')
      .assert.containsText('h4.search-heading', 'Search For Users')
      .setValue('input[name=search]', 'john')
      .click('button#searchButton')
      .pause(2000)
      .waitForElementVisible('td')
      .assert.containsText('td', 'john chuks')
      .assert.containsText('td', 'efemonet@andela.com')
      .end(),
};
