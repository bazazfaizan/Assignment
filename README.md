# SDET Practical Assignment

## Overview

This repository contains the SDET practical assignment covering:

- Requirement analysis and risk-based test scenarios
- Defect/discrepancy identification for the FR-05 API response
- Detailed UI and API test cases
- Playwright UI automation using Page Object Model
- API contract automation
- Negative API validation
- AI usage reflection
- Architecture discussion

> **Important:** The assignment provides the page structure and requirements, but it does not provide a live application/API endpoint. The automation therefore uses environment variables for the real application/API and includes a small local HTML fixture so the UI suite can be executed independently. API tests target `API_BASE_URL` when configured.

## Technology Choice

- TypeScript
- Playwright
- Playwright APIRequestContext
- Zod for runtime schema validation
- Node.js / npm

## Project Structure

```text
.
├── README.md
├── package.json
├── tsconfig.json
├── playwright.config.ts
├── docs/
│   ├── 1-requirement-analysis.md
│   ├── 2-test-scenarios.md
│   ├── 3-defect-identification.md
│   ├── 4-test-cases.md
│   ├── 7-ai-reflection.md
│   └── 8-architecture-discussion.md
├── tests/
│   ├── ui/
│   │   ├── pages/
│   │   │   └── autocomplete.page.ts
│   │   ├── tests/
│   │   │   └── autocomplete.spec.ts
│   │   └── config/
│   │       └── test-data.ts
│   └── api/
│       └── tests/
│           └── autocomplete-api.spec.ts
├── test-fixtures/
│   └── autocomplete-form.html
├── prompts/
│   └── assignment-analysis-prompt.md
└── ai-transcript/
    └── conversation-transcript.json
```

## Prerequisites

- Node.js 20+
- npm

## Installation

```bash
npm install
npx playwright install chromium
```

## Run UI Tests

The default UI configuration uses the included local fixture.

```bash
npm test
```

Headed mode:

```bash
npm run test:headed
```

Playwright report:

```bash
npm run report
```

## Run API Tests

Set the API endpoint before execution:

Windows PowerShell:

```powershell
$env:API_BASE_URL="https://your-api-host"
npm run test:api
```

Linux/macOS:

```bash
export API_BASE_URL="https://your-api-host"
npm run test:api
```

The expected GET endpoint can be configured with:

```text
FORM_RESPONSE_PATH=/your/endpoint
```

Default:

```text
/api/form-response/98765
```

## Quality / Design Decisions

1. Risk-based prioritization is used instead of treating every scenario equally.
2. UI and API coverage are separated so failures can be isolated quickly.
3. Page Object Model keeps selectors and user interactions out of test cases.
4. Contract validation is implemented as runtime validation, not only TypeScript typing.
5. Locale and timestamp validation are explicit because they are common integration defects.
6. Suggestion-list validation checks that the persisted list contains only matching suggestions.
7. Negative API cases verify that invalid contracts are rejected rather than silently accepted.
8. The suite is configurable through environment variables so the same tests can run against different environments.

## Assumption

The provided assignment does not specify the actual API URL, HTTP method for GET retrieval, or exact authentication mechanism. Those values are therefore externalized instead of being invented.
