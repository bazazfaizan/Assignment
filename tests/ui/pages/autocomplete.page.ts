import { expect, Locator, Page } from '@playwright/test';

export class AutocompletePage {
  readonly input: Locator;
  readonly suggestions: Locator;
  readonly suggestionItems: Locator;
  readonly nextButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  constructor(private readonly page: Page) {
    this.input = page.locator('#input-field');
    this.suggestions = page.locator('.suggestions');
    this.suggestionItems = page.locator('.suggestions li');
    this.nextButton = page.locator('#next-button');
    this.errorMessage = page.locator('.error-message');
    this.successMessage = page.locator('.success-container');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async type(value: string): Promise<void> {
    await this.input.fill(value);
  }

  async clear(): Promise<void> {
    await this.input.fill('');
  }

  async getSuggestions(): Promise<string[]> {
    return this.suggestionItems.allTextContents();
  }

  async selectSuggestion(value: string): Promise<void> {
    await this.suggestionItems.filter({ hasText: value }).click();
  }

  async submit(): Promise<void> {
    await this.nextButton.click();
  }

  async pressEnter(): Promise<void> {
    await this.nextButton.focus();
    await this.page.keyboard.press('Enter');
  }

  async pressEscape(): Promise<void> {
    await this.input.focus();
    await this.page.keyboard.press('Escape');
    await this.clear();
  }

  async expectSuccess(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
  }

  async expectError(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }
}
