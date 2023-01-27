const { test, expect } = require('@playwright/test');
import {login, pass} from '../../user.js'

test.beforeEach(async ({ page }) => {
  await page.goto('https://netology.ru/');
  await page.screenshot({ path: './screenshot/startPage.png' });
  await page.getByRole('link', { name: 'Войти' }).click();
  await page.screenshot({ path: './screenshot/authorizationPage.png' });
});

test.describe('TestNetologyRu', () => {
  test('successful authorization with a valid username and password', async ({ page }) => {
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(login);
    await page.getByPlaceholder('Пароль').click();
    await page.getByPlaceholder('Пароль').fill(pass);
    await page.getByTestId('login-submit-btn').click();
    await expect(page.getByRole('heading', { name: 'Мои курсы и профессии' })).toBeVisible();
  })

  test('authorization with invalid username', async ({ page }) => {
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill("qweqweqwe@mail.ru");
    await page.getByPlaceholder('Пароль').click();
    await page.getByPlaceholder('Пароль').fill(pass);
    await page.getByTestId('login-submit-btn').click();
    await expect(page.getByTestId('login-error-hint')).toHaveText('Вы ввели неправильно логин или пароль');
  })

  test('authorization with invalid password', async ({ page }) => {
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(login);
    await page.getByPlaceholder('Пароль').click();
    await page.getByPlaceholder('Пароль').fill("pass");
    await page.getByTestId('login-submit-btn').click();
    await expect(page.getByTestId('login-error-hint')).toHaveText('Вы ввели неправильно логин или пароль');
  })
})

