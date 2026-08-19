# 8. Architecture Discussion

## Proposed Automation Architecture

```text
                 ┌──────────────────────┐
                 │   Playwright Tests   │
                 └──────────┬───────────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
      ┌───────▼────────┐         ┌────────▼─────────┐
      │   UI Tests     │         │    API Tests     │
      │  Page Objects  │         │ Contract Checks  │
      └───────┬────────┘         └────────┬─────────┘
              │                           │
      ┌───────▼────────┐         ┌────────▼─────────┐
      │ Web Application│         │ Backend API      │
      └────────────────┘         └──────────────────┘
```

## Design Principles

### 1. Page Object Model

Selectors and UI actions are encapsulated in `AutocompletePage`. This keeps test cases focused on behavior rather than implementation details.

### 2. Contract-first API Validation

FR-05 is converted into runtime assertions. The suite validates:
- Required fields
- Email format
- Timestamp format
- Locale format
- Boolean type
- Suggestion matching rules

### 3. Separation of UI and API Tests

UI tests validate user-visible behavior. API tests validate persistence and contract behavior. This reduces diagnosis time when a test fails.

### 4. Environment Configuration

The application and API endpoints are not hardcoded. This supports local, QA, staging, and CI environments.

### 5. CI/CD Readiness

Recommended pipeline stages:

```text
Install
  ↓
Lint / Type Check
  ↓
API Contract Tests
  ↓
UI Smoke Tests
  ↓
Full Regression
  ↓
Publish Playwright Report
```

### 6. Failure Diagnostics

Playwright is configured to retain:
- Trace on failure
- Screenshots on failure
- Video on failure
- HTML report

This is useful for CI debugging without reproducing every failure locally.

## Recommended Future Enhancements

- Add authentication fixtures once the real login mechanism is provided.
- Add API request/response logging with secrets masked.
- Add test tagging (`@smoke`, `@regression`, `@api`).
- Add schema versioning if FR-05 evolves.
- Add accessibility checks with an approved accessibility library.
- Run browser matrix testing after the Chrome baseline is stable.
