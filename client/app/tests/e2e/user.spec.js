import faker from 'faker';
import config from './config';

const fullName = faker.name.findName();
const userName = faker.internet.userName();
const email = faker.internet.email();
const password = faker.internet.password();
const newPassword = faker.internet.password();
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
      .assert.containsText('h5.all-documents', 'All Documents'),

   'Update a user': browser =>
    browser
      .url(`${config.url}/profile`)
      .waitForElementVisible('body')
      .waitForElementVisible('h4.searchHeading')
      .pause(500)
      .assert.containsText('h4.searchHeading', 'Edit Profile')
      .clearValue('input[name=fullName]')
      .setValue('input[name=fullName]', fullName)
      .pause(500)
      .clearValue('input[name=userName]')
      .setValue('input[name=userName]', userName)
      .click('button#editButton')
      .pause(1000)
      .waitForElementVisible('div.toast-message')
      .pause(500)
      .assert.containsText('div.toast-message', 'Profile updated successfully')
      .pause(500)
      .click('a.button-collapse.navigationCollapse')
      .waitForElementVisible('span#welcomeName')
      .pause(1000)
      .assert.containsText('span#welcomeName.name', `Welcome ${fullName}!`),

   'Change password': browser =>
     browser
       .url(`${config.url}/profile`)
       .waitForElementVisible('body')
       .waitForElementVisible('h4.searchHeading')
       .pause(500)
       .setValue('input[name=oldPassword]', newPassword)
       .setValue('input[name=password]', newPassword)
       .setValue('input[name=confirmPassword', newPassword)
       .click('button#editButton')
       .pause(500)
       .waitForElementVisible('span.error-block')
       .assert.containsText('span.error-block', 'Invalid password')
       .clearValue('input[name=oldPassword]')
       .setValue('input[name=oldPassword', password)
       .clearValue('input[name=password]')
       .setValue('input[name=password]', newPassword)
       .clearValue('input[name=confirmPassword')
       .setValue('input[name=confirmPassword', password)
       .click('button#editButton')
       .pause(1000)
       .waitForElementVisible('div.toast-message')
       .assert.containsText('div.toast-message', 'Passwords do not match')
       .clearValue('input[name=oldPassword]')
       .pause(500)
       .setValue('input[name=oldPassword', password)
       .pause(500)
       .clearValue('input[name=password]')
       .setValue('input[name=password]', newPassword)
       .pause(500)
       .clearValue('input[name=confirmPassword')
       .setValue('input[name=confirmPassword', newPassword)
       .click('button#editButton')
       .pause(3000)
       .waitForElementVisible('div.toast-message')
       .assert.containsText('div.toast-message', 'Profile updated successfully')
       .end(),



  'Invalid signup': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#navSignup')
      .click('#signupButton')
      .waitForElementVisible('span.error-block')
      .assert.containsText('span.error-block', 'This Field is Required')
      .end(),



  'Sign a user in successfully': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('#navLogin')
      .setValue('input[name=email]', 'johnbosco.ohia@andela.com')
      .setValue('input[name=password]', 'adminpassword')
      .click('#loginButton')
      .waitForElementVisible('h5.all-documents')
      .assert.containsText('h5.all-documents', 'All Documents')
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
      .waitForElementVisible('span.error-block')
      .assert.containsText('span.error-block', 'This field is required')
      .pause(1000)
      .end(),

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
      .assert.containsText('td', 'john bosco')
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
      .pause(500)
      .click('a#manageusersNav')
      .pause(500)
      .waitForElementVisible('h5.manage-users')
      .pause(500)
      .assert.containsText('h5.manage-users', 'Manage Users')
      .click('li.next')
      .waitForElementVisible('button#deleteUserButton')
      .pause(500)
      .click('button#deleteUserButton')
      .waitForElementVisible('div.modal-content')
      .pause(500)
      .assert.containsText(
        'div.modal-content',
        'Are you sure you want to delete this user'
      )
      .click('button#yesButton')
      .waitForElementVisible('div.toast-message')
      .assert.containsText('div.toast-message', 'user deleted successfully'),

};
