# 4. Detailed Test Cases

## TC-001 — Successful submission persists the selected suggestion

**Preconditions**
- User is logged in.
- User has reached the autocomplete form.
- Default prefix matching is enabled.
- API is available.

**Steps**
1. Click the text input.
2. Type `agile`.
3. Verify the three agile suggestions are displayed.
4. Select `agile methodology`.
5. Click **Next**.
6. Verify the success message.
7. Retrieve the persisted response using the GET API.

**Expected Results**
- The selected value populates the input.
- Submission returns HTTP 200.
- Success message is displayed.
- Persisted response contains all FR-05 properties.
- `completed` is boolean `true`.

**Test Data**
- User: `test123@gmail.com`
- Value: `agile methodology`

---

## TC-002 — Invalid input is rejected

**Preconditions**
- User has reached the form.

**Steps**
1. Enter `database`.
2. Do not select a valid suggestion.
3. Click **Next**.

**Expected Results**
- Submission is not treated as successful.
- Error message is displayed.
- No response is persisted as completed.

**Test Data**
- Input: `database`

---

## TC-003 — Prefix filtering returns matching suggestions

**Preconditions**
- Prefix matching is enabled.

**Steps**
1. Enter `agile method`.
2. Inspect the suggestion list.

**Expected Results**
- All three supplied suggestions remain visible because they begin with the entered prefix.

**Test Data**
- Input: `agile method`

---

## TC-004 — No prefix match removes suggestions

**Steps**
1. Enter `database`.
2. Inspect the suggestion list.

**Expected Results**
- No suggestion is displayed.

**Test Data**
- Input: `database`

---

## TC-005 — Match-anywhere configuration is honored

**Preconditions**
- Backend is configured for match-anywhere filtering.

**Steps**
1. Enter `methodology process`.
2. Inspect the suggestions.

**Expected Results**
- Suggestions containing the entered substring remain visible.
- Suggestions that do not contain the substring are removed.

**Test Data**
- Input: `methodology process`

---

## TC-006 — Locale is persisted in the required format/value

**Preconditions**
- User locale is configured as `en-IN`.

**Steps**
1. Complete the form with `agile methodology`.
2. Retrieve the persisted response.
3. Validate `locale`.

**Expected Results**
- Locale is present.
- Locale follows IETF BCP 47 syntax.
- The persisted value reflects the configured user locale when that is the contract expectation.

**Test Data**
- Locale: `en-IN`

---

## TC-007 — Timestamps satisfy the contract

**Steps**
1. Record the time immediately before reaching the form.
2. Complete the form.
3. Retrieve the API response.
4. Parse `start_date` and `end_date`.

**Expected Results**
- Both timestamps are present and valid.
- `end_date` is later than `start_date`.
- Values preserve the user's local-time requirement/offset.

**Test Data**
- User timezone: IST, UTC+05:30

---

## TC-008 — `suggestion_list` contains only matching suggestions

**Steps**
1. Select `agile methodology`.
2. Submit the form.
3. Retrieve the response.
4. Split `suggestion_list` by comma.
5. Compare every value against the entered text.

**Expected Results**
- Every persisted suggestion matches the entered value according to the active filtering rule.
- Unrelated suggestions are not persisted.

**Test Data**
- Selected value: `agile methodology`

---

## TC-009 — Keyboard navigation and Enter submission

**Steps**
1. Focus the input.
2. Use Tab to navigate to the Next button.
3. Select a valid suggestion using keyboard-compatible interaction.
4. Press Enter.

**Expected Results**
- Focus moves predictably.
- Enter submits the form.
- Successful valid submission displays the success message.

---

## TC-010 — Escape clears/closes interaction

**Steps**
1. Type a partial value.
2. Press Escape.
3. Inspect the input/suggestion state.

**Expected Results**
- The interaction is cleared/closed according to the UI behavior defined by the implementation.
- The test does not depend on a mouse-only action.
