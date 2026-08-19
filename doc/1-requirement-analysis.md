# 1. Requirement Analysis

## Scope

The assignment covers an authenticated user reaching an autocomplete form, interacting with suggestions, submitting a valid/invalid response, and validating the persisted response through an API.

## Functional Requirement Mapping

| ID    | Requirement                                | Primary Test Layer   |
| ----- | ------------------------------------------ | -------------------- |
| FR-01 | User can type or select a suggestion       | UI                   |
| FR-02 | Default prefix filtering                   | UI                   |
| FR-03 | Configurable match-anywhere filtering      | UI/API/configuration |
| FR-04 | Submit, API status, success/error behavior | UI + API             |
| FR-05 | Persisted response data contract           | API                  |

## Key Quality Risks

- Incorrect filtering can cause users to select invalid values.
- Submission can show success while persistence is incorrect.
- Timestamps may be stored in UTC while the contract asks for the user's local time.
- `locale` can be returned in an incomplete or invalid format.
- `completed` can be serialized as a string instead of a boolean.
- `suggestion_list` can contain every suggestion instead of only suggestions matching the entered/selected value.
- Keyboard accessibility can fail even when mouse-based flows work.
