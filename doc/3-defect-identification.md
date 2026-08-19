# 3. Defect Identification — FR-05 Response

## Reference Response

The assignment provides a successful GET response after selecting `agile methodology`.

## Discrepancies

### D-01 — `locale` does not preserve the expected locale value

**Actual:** `en`

**Requirement:** `locale` is the user's locale in IETF BCP 47 format, with `en-IN` given as an example.

**Assessment:** `en` is syntactically valid as a BCP 47 language tag, so it is not inherently an invalid BCP 47 value. However, it does not represent the provided test environment's configured locale (`en-IN`) if that configuration is expected to be persisted. This should be treated as a data-value defect only if the system is required to persist the user's configured locale rather than only a language tag.

### D-02 — `completed` has the wrong data type

**Actual:** `"true"` (string)

**Required:** Boolean representing the upload status.

**Expected:** `true`

**Severity:** High

### D-03 — Timestamp representation does not demonstrate the user's local timezone

**Actual:** `2024-03-15T10:30:00Z` and `2024-03-15T10:32:00Z`

**Requirement:** Timestamps in the user's local time; test user is in IST (UTC+05:30).

**Expected example:** `2024-03-15T16:00:00+05:30` and `2024-03-15T16:02:00+05:30`, assuming the source timestamps represent those exact instants.

**Severity:** High

The strongest issue is not that ISO-8601 `Z` is invalid; it is that `Z` represents UTC and therefore does not preserve the requested local-time offset.

## No Defect Found

- `account_id` is present.
- `account_email` is present and matches the supplied login user.
- `text` is present and matches the selected suggestion.
- `suggestion_list` contains the three suggestions that match `agile methodology`.
- `end_date` is later than `start_date`.

## Important QA Note

The assignment does not define the exact API response schema for `account_id` (string vs number), so the test should avoid inventing a narrower type than the requirement supports.
