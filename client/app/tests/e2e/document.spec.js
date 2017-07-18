import config from './config';

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
    .setValue('input[name=title]', 'document it!!')
    .pause(1000)
    .click('.mce-i-code')
    .setValue('.mce-textbox', 'faker documents are here bro')
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
    .click('#materialize-modal-overlay-1'),

'Update document': browser =>
  browser
    .url(`${config.url}/documents`)
    .waitForElementVisible('body')
    .click('#editIcon i')
    .waitForElementVisible('input#title')
    .pause(1000)
    .setValue('input[name=title]', 'WEST Side')
    .click('select.browser-default')
    .click('option[value="private"]')
    .click('#updatedocbutton')
    .waitForElementVisible('div.toast-message')
    .assert.containsText('div.toast-message', 'document updated successfully'),

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
    .assert.containsText('p#documentcontent', 'Han is a bad guy'),

'Search Document': browser =>
  browser
    .waitForElementVisible('body')
    .url(`${config.url}/searchdocument`)
    .waitForElementVisible('h5.search-doc')
    .assert.containsText('h5.search-doc', 'Search For Documents')
    .setValue('input[name=search]', 'water')
    .click('#searchButton')
    .waitForElementVisible('div.card-content')
    .end(),
};
