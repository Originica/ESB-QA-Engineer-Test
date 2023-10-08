const { By, Builder, Browser } = require('selenium-webdriver');
const { suite } = require('selenium-webdriver/testing');
const assert = require("assert");

const acceptedUsername = 'standard_user';
const acceptedPassword = 'secret_sauce';
const wrongUsername = 'not_username';
const wrongPassword = 'not_password';

suite(function (env) {
    describe('Login', function () {
        let driver;

        this.beforeEach(async function () {
            driver = await new Builder().forBrowser('chrome').build();
            await driver.get('https://www.saucedemo.com');
        });

        this.afterEach(async () => await driver.quit());

        it('Login successful', async function () {
            let usernameField = await driver.findElement(By.id('user-name'));
            let passwordField = await driver.findElement(By.id('password'));
            let loginButton = await driver.findElement(By.id('login-button'));

            await usernameField.sendKeys(acceptedUsername);
            await passwordField.sendKeys(acceptedPassword);
            await driver.actions().pause(500);
            await loginButton.click();

            let title = await driver.findElement(By.xpath('//*[@id="header_container"]/div[2]/span'))
            let titleText = await title.getText();
            assert.equal('Products', titleText);

            await driver.actions().pause(500);

        });

        it('Wrong username', async function () {
            let usernameField = await driver.findElement(By.id('user-name'));
            let passwordField = await driver.findElement(By.id('password'));
            let loginButton = await driver.findElement(By.id('login-button'));

            await usernameField.sendKeys(wrongUsername);
            await passwordField.sendKeys(acceptedPassword);

            await loginButton.click();

            await driver.actions().pause(500);

            let errorNotice = await driver.findElement(By.xpath('//*[@id="login_button_container"]/div/form/div[3]/h3'));
            let errorMessage = await errorNotice.getText();

            assert(errorMessage.includes('Epic sadface: Username and password do not match any user in this service'))

            await driver.actions().pause(500);

        });

        it('Wrong password', async function () {
            let usernameField = await driver.findElement(By.id('user-name'));
            let passwordField = await driver.findElement(By.id('password'));
            let loginButton = await driver.findElement(By.id('login-button'));

            await usernameField.sendKeys(acceptedUsername);
            await passwordField.sendKeys(wrongPassword);
            await loginButton.click();

            await driver.actions().pause(500);

            let errorNotice = await driver.findElement(By.xpath('//*[@id="login_button_container"]/div/form/div[3]/h3'));
            let errorMessage = await errorNotice.getText();

            assert(errorMessage.includes('Epic sadface: Username and password do not match any user in this service'))

            await driver.actions().pause(500);

        });


    });
}, { browsers: [Browser.CHROME] });
