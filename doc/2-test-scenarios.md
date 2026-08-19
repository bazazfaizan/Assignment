# 2. Top 10 Test Scenarios — Risk Ranked

| Rank | Scenario                                                                                                | Risk     | Rationale                                                                                     |
| ---: | ------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------- |
|    1 | Verify successful submission persists all FR-05 fields with correct values and data types               | Critical | This is the core business outcome; incorrect persistence makes the completed form unreliable. |
|    2 | Verify invalid input cannot be submitted as a successful response                                       | Critical | Accepting invalid input can create bad business data and false completion records.            |
|    3 | Verify suggestion filtering follows configured prefix/match-anywhere behavior                           | High     | Incorrect filtering directly affects whether users can find and select valid values.          |
|    4 | Verify `start_date` and `end_date` are valid timestamps and represent the user's local time requirement | High     | Timestamp defects can affect auditing, reporting, and downstream processing.                  |
|    5 | Verify `locale` follows IETF BCP 47 format                                                              | High     | Locale is part of the persisted contract and affects interpretation of user context.          |
|    6 | Verify `completed` is a boolean and correctly reflects upload status                                    | High     | A wrong type or status can break consumers and misrepresent completion.                       |
|    7 | Verify `suggestion_list` contains only suggestions matching the entered/selected value                  | High     | Persisting unrelated suggestions violates the contract and can affect downstream behavior.    |
|    8 | Verify keyboard navigation, Enter submission, and Escape interaction                                    | Medium   | Keyboard failures reduce accessibility and can block non-mouse users.                         |
|    9 | Verify selecting a suggestion populates the exact selected value                                        | Medium   | Incorrect selection state can lead to invalid or unexpected submission data.                  |
|   10 | Verify empty input and no-match input behave predictably                                                | Medium   | Boundary behavior is important for usability and prevents ambiguous submissions.              |
