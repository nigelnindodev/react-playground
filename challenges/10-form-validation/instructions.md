# Form Validation Challenge

Build a registration form with real-time client-side validation.

## Requirements

Build a form with these fields:

| Field | Validation rule |
|-------|----------------|
| Name | Required, at least 2 characters |
| Email | Required, must contain `@` and `.` |
| Password | Required, at least 8 characters |
| Confirm Password | Must match Password |

1. Validate each field **on blur** (when the user leaves the field)
2. Show an inline error message beneath each invalid field
3. The "Submit" button should be **disabled** while any field is invalid or empty
4. On successful submission (all fields valid), display a success message: `"Registration successful!"`
5. Do not use any external validation library

## Hints

- Keep an `errors` object in state: `{ name: string; email: string; password: string; confirm: string }`
- A `validate(field, value)` helper function keeps things tidy
- `onBlur` on each `<input>` triggers per-field validation
- Check all errors are empty strings before enabling the submit button
