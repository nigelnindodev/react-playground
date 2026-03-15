# Agent Guidelines

## Important Rules

- **Never remove node_modules** - always run `npm install` to fix corrupted/incomplete installs instead
- **Always verify package.json versions** before suggesting version changes
- **Check for security vulnerabilities** (CVEs) before finalizing dependencies
- **Fix code rather than downgrading versions** when build issues arise
- **Wait for npm install to complete** before testing builds
- **Never create duplicate rendering targets** - If multiple components need access to the same DOM (e.g., preview + validation), share a single reference instead of each creating their own

## Workflow

- Run `npm install` and wait for completion before testing builds
- Verify all checks pass (`npm run lint` and `npm run build`) before considering task complete
- When encountering build errors, research and fix the root cause
- **Test component integration early** - Verify that components that depend on each other actually share state/refs correctly before considering work complete
- **Validate hooks order and dependencies** - Ensure useEffect dependencies are complete and don't cause stale closures or unnecessary re-runs
- **Don't keep dev server running** - Only start when needed to verify changes
- **Start, verify, then close** - Run dev server temporarily to test, then kill it
- Clean up build artifacts (`dist/`) before commits if desired

## Dependencies

- Use latest stable versions of frameworks (Vite, React, TypeScript)
- Always check for known CVEs in dependency versions
- Include all required dependencies in package.json before deployment

## This Project

- Uses Vite (not Next.js)
- No external API calls - TanStack Query not needed
- Monaco Editor for code editing
- Sandboxed iframe preview for rendering user code
- Preview and Validator share a ref to the same iframe's root element
- Validation is triggered manually via button, not automatically in useEffect
