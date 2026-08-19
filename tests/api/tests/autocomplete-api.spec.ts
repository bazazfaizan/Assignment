import { test, expect } from '@playwright/test';
import { z } from 'zod';

const responseSchema = z.object({
  account_id: z.union([z.string(), z.number()]),
  account_email: z.string().email(),
  start_date: z.string().datetime({ offset: true }),
  end_date: z.string().datetime({ offset: true }),
  locale: z.string().regex(/^[A-Za-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/),
  text: z.string(),
  suggestion_list: z.string(),
  completed: z.boolean()
});

const matchingSuggestions = [
  'agile methodology',
  'agile methodology process',
  'agile methodology process testing'
];

const apiBaseUrl = process.env.API_BASE_URL;
const responsePath = process.env.FORM_RESPONSE_PATH || '/api/form-response/98765';

test.describe('Autocomplete Form - API Contract', () => {
  test.skip(!apiBaseUrl, 'Set API_BASE_URL to run API tests against the target environment.');

  test('valid response matches FR-05 contract and data types', async ({ request }) => {
    const response = await request.get(`${apiBaseUrl}${responsePath}`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    const parsed = responseSchema.safeParse(body);

    expect(parsed.success, JSON.stringify(parsed.success ? {} : parsed.error.issues, null, 2)).toBe(true);

    if (parsed.success) {
      expect(typeof parsed.data.completed).toBe('boolean');
      expect(parsed.data.end_date >= parsed.data.start_date).toBe(true);
      expect(parsed.data.locale).toMatch(/^[A-Za-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/);

      const persistedSuggestions = parsed.data.suggestion_list
        .split(',')
        .map((s: string) => s.trim())
        .filter(Boolean);

      const text = parsed.data.text.toLowerCase();
      for (const suggestion of persistedSuggestions) {
        expect(suggestion.toLowerCase().includes(text)).toBe(true);
        expect(matchingSuggestions).toContain(suggestion);
      }
    }
  });

  test('rejects/does not accept a payload with missing required fields', async ({ request }) => {
    const invalidPayload = {
      account_id: '98765',
      account_email: 'test123@gmail.com',
      text: 'agile methodology',
      completed: true
    };

    const response = await request.post(`${apiBaseUrl}${responsePath}`, {
      data: invalidPayload
    });

    expect([400, 422]).toContain(response.status());
  });

  test('rejects invalid completed data type', async ({ request }) => {
    const invalidPayload = {
      account_id: '98765',
      account_email: 'test123@gmail.com',
      start_date: '2024-03-15T10:30:00Z',
      end_date: '2024-03-15T10:32:00Z',
      locale: 'en-IN',
      text: 'agile methodology',
      suggestion_list: 'agile methodology',
      completed: 'true'
    };

    const response = await request.post(`${apiBaseUrl}${responsePath}`, {
      data: invalidPayload
    });

    expect([400, 422]).toContain(response.status());
  });
});
