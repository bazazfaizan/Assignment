import { test, expect } from '@playwright/test';
import { AutocompletePage } from '../pages/autocomplete.page';
import { testData } from '../config/test-data';

test.describe('Autocomplete Form - UI', () => {
  let form: AutocompletePage;

  test.beforeEach(async ({ page }) => {
    form = new AutocompletePage(page);
    await form.goto();
  });

  test('supports tab navigation across form controls', async ({ page }) => {
    await form.input.focus();
    await page.keyboard.press('Tab');
    await expect(form.nextButton).toBeFocused();
  });

  test('supports Enter and Escape keyboard interactions', async () => {
    await form.type(testData.validSuggestion);
    await form.pressEscape();
    await expect(form.input).toHaveValue('');
  });

  test('filters suggestions using prefix matching', async () => {
    await form.type('agile method');
    await expect(form.suggestionItems).toHaveCount(3);
    await expect(form.suggestionItems).toHaveText(testData.suggestions);
  });

  test('hides suggestions when no prefix matches', async () => {
    await form.type(testData.unmatchedText);
    await expect(form.suggestionItems).toHaveCount(0);
  });

  test('selecting a suggestion populates the input field', async () => {
    await form.type('agile');
    await form.selectSuggestion(testData.validSuggestion);
    await expect(form.input).toHaveValue(testData.validSuggestion);
  });

  test('valid selection displays success after submission', async () => {
    await form.type('agile');
    await form.selectSuggestion(testData.validSuggestion);
    await form.submit();
    await form.expectSuccess();
  });

  test('invalid input displays an error after submission', async () => {
    await form.type(testData.unmatchedText);
    await form.submit();
    await form.expectError();
  });

  test('all default suggestions are shown for an empty input', async () => {
    await expect(form.suggestionItems).toHaveText(testData.suggestions);
  });
});
