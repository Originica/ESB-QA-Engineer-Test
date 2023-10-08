const { By, Builder, Browser, WebDriver } = require('selenium-webdriver');
const { suite } = require('selenium-webdriver/testing');
const assert = require("assert");

const acceptedUsername = 'standard_user';
const acceptedPassword = 'secret_sauce';
const firstName = 'Mary';
const lastName = 'Poppins';
const zipCode = '26864'

suite(function (env) {
    describe('Login', function () {
        let driver;

        this.beforeEach(async function () {
            driver = await new Builder().forBrowser('chrome').build();
            await driver.get('https://www.saucedemo.com');

            let usernameField = await driver.findElement(By.id('user-name'));
            let passwordField = await driver.findElement(By.id('password'));
            let loginButton = await driver.findElement(By.id('login-button'));

            await usernameField.sendKeys(acceptedUsername);
            await passwordField.sendKeys(acceptedPassword);
            await loginButton.click();
        });

        this.afterEach(async () => await driver.quit());

        it('Checkout successful', async function () {
            let addToCartButton = await driver.findElement(By.id('add-to-cart-sauce-labs-backpack'));
            await addToCartButton.click();
            let cartIcon = await driver.findElement(By.className('shopping_cart_link'));
            await cartIcon.click();

            let checkoutButton = await driver.findElement(By.id('checkout'));
            await checkoutButton.click();

            let firstNameField = await driver.findElement(By.id('first-name'));
            let lastNameField = await driver.findElement(By.id('last-name'));
            let zipCodeField = await driver.findElement(By.id('postal-code'));

            await firstNameField.sendKeys(firstName);
            await lastNameField.sendKeys(lastName);
            await zipCodeField.sendKeys(zipCode);

            let continueButton = await driver.findElement(By.id('continue'));
            await continueButton.click();

            let finishButton = await driver.findElement(By.id('finish'));
            await finishButton.click();

            let title = await driver.findElement(By.className('title'));
            let titleText = await title.getText();
            assert.equal(titleText, 'Checkout: Complete!');
        });

    });
}, { browsers: [Browser.CHROME] });
