# 7. AI Reflection

## a. Tools Used

- ChatGPT

## b. Usage Areas

AI was used as an engineering assistant for:
- Breaking the requirements into testable behaviors.
- Generating an initial risk-based test scenario structure.
- Reviewing the FR-05 response against the stated contract.
- Suggesting Playwright Page Object Model structure.
- Drafting initial API contract validation ideas.
- Reviewing negative test coverage.

AI was not treated as the final authority. The assignment requirements were used as the source of truth.

## c. Modifications Made

### Modification 1 — Locale handling

The initial reasoning could treat `locale: "en"` as automatically defective because the environment example says `en-IN`. I changed the assessment to distinguish syntax from expected business value: `en` is a valid BCP 47 language tag, but it may still be a defect if the system is expected to persist the configured `en-IN` locale.

**Reason:** This avoids reporting a standards violation that is not actually supported by the requirement.

### Modification 2 — Timestamp handling

The test design was made explicit about the difference between UTC (`Z`) and a local offset such as `+05:30`.

**Reason:** The requirement specifically asks for the user's local time, so simply validating that the timestamp is ISO-8601 is insufficient.

### Modification 3 — Runtime validation instead of TypeScript-only types

The API automation uses Zod runtime validation.

**Reason:** TypeScript types disappear at runtime and cannot prove that an actual API response contains the expected data types.

### Modification 4 — Externalized unknown API details

The actual API URL and exact endpoint were not supplied. Instead of inventing them, `API_BASE_URL` and `FORM_RESPONSE_PATH` are environment variables.

**Reason:** This keeps the test suite portable and makes assumptions visible.

## d. AI Limitations

One limitation is that AI can over-assume missing implementation details. For example, it may assume a particular API endpoint, authentication mechanism, or exact locale representation even though the assignment does not define them.

I mitigated this by:
- Keeping unspecified values configurable.
- Calling out assumptions in the README.
- Treating the assignment text as the source of truth.
- Distinguishing a standards-valid value from a business-rule mismatch.
