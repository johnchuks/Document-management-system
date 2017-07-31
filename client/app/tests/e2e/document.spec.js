import config from './config';
import faker from 'faker';

const title = faker.random.word();
const updatedTitle = faker.random.word();

export default {
'Create a document': browser =>
  browser
    .url(config.url)
    .waitForElementVisible('body')
    .setValue('input[name=email]', 'johnbosco.ohia@andela.com')
    .setValue('input[name=password]', 'adminpassword')
    .click('#loginButton')
    .waitForElementVisible('h5.all-documents')
    .click('.button-collapse')
    .click('#mydocumentNav')
    .waitForElementVisible('h5.my-document')
    .assert.containsText('h5.my-document', 'My Documents')
    .click('.btn-floating.btn-large i')
    .waitForElementVisible('h4')
    .setValue('input[name=title]', title)
    .pause(1000)
    .click('.mce-i-code')
    .setValue('.mce-textbox', 'faker document is here')
    .click('.mce-floatpanel .mce-container-body button')
    .click('select.browser-default')
    .pause(1000)
    .click('option[value="public"]')
    .assert.containsText('option[value="public"]', 'Public')
    .pause(1000)
    .click('#documentbutton')
    .waitForElementVisible('div.toast-message')
    .assert.containsText('div.toast-message', 'Document created successfully')
    .pause(1000)
    .waitForElementVisible('h5.my-document')
    .pause(1000)
    .waitForElementVisible('span.card-title')
    .assert.containsText('span.card-title', title)
    .pause(1000)
    .assert.containsText('p', 'faker document is here'),

'Update document': browser =>
  browser
    .url(`${config.url}/documents`)
    .waitForElementVisible('body')
    .click('#editIcon i')
    .waitForElementVisible('.modal.open h4')
    .assert.containsText('.modal.open h4', 'update document')
    .pause(1000)
    .setValue('input#title.validate', `${title}${updatedTitle}`)
    .pause(500)
    .click('select.browser-default')
    .click('option[value="private"]')
    .pause(500)
    .click('#updatedocbutton')
    .waitForElementVisible('div.toast-message')
    .assert.containsText('div.toast-message', 'document updated successfully')
    .assert.containsText('span.card-title', `${title}${updatedTitle}`),

'Delete a document': browser =>
  browser
    .waitForElementVisible('body')
    .click('i#deleteIcon')
    .waitForElementVisible('h5#h5')
    .assert.containsText('h5#h5', 'Are you sure you want to delete this document')
    .click('button#yesButton')
    .waitForElementVisible('div.toast-message')
    .assert.containsText('div.toast-message', 'document deleted successfully'),

'View Document': browser =>
  browser
    .waitForElementVisible('body')
    .url(`${config.url}/dashboard`)
    .waitForElementVisible('h5.all-documents')
    .assert.containsText('h5.all-documents', 'All Documents')
    .click('a#viewdocs')
    .waitForElementVisible('p#documentcontent')
    .assert.containsText('p#documentcontent', 'sdfdfsdf'),

'Search Document': browser =>
  browser
    .click('div#materialize-modal-overlay-1')
    .waitForElementVisible('h5.all-documents')
    .pause(1000)
    .click('a.button-collapse.navigationCollapse')
    .waitForElementVisible('a#searchdocumentNav')
    .pause(500)
    .click('#searchdocumentNav')
    .waitForElementVisible('h5.search-doc')
    .assert.containsText('h5.search-doc', 'Search For Documents')
    .setValue('input[name=search]', 'water')
    .click('#searchButton')
    .waitForElementVisible('div.card-content')
    .pause(500)
    .assert.containsText('span.card-title', 'waterfallsss')
    .assert.containsText('p', 'the water is pouring down heavilyjjj')
    .pause(1000)
   .end(),
 };
