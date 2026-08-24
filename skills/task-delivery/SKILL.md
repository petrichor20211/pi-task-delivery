---
name: task-delivery
description: Follow the current project specification and delivery rules during repository development, debugging, checking, documentation, and commit work.
---

# Task Delivery

## Workflow

1. Understand the user's intent and keep the work within that scope.
2. Read the current `docs/SPEC.md` and `docs/CHECKLIST.md` when present.
3. Treat current documentation as authoritative. Accept collaborators' edits and deletions; do not restore older content from session memory.
4. Make the smallest direct change that completes the task.
5. Record real debugging work in `docs/DEBUGLOG.md` and real checking findings and fixes in `docs/CHECKLOG.md`.

## Rules

- Only the user may edit `docs/SPEC.md` and `docs/CHECKLIST.md`.
- Follow file placement and naming rules from the current project documentation.
- Do not over-engineer or expand a local change into a broad redesign.
- Trust data that conforms to the project contract. Fix bad data separately instead of adding redundant code fallbacks.
- Do not add defensive handling for unspecified edge cases.
- Do not create useless test files or run unrelated full-scale validation.
- Keep commits small and independent. Pull before committing, resolve conflicts, then commit and push according to the user's instructions.

Task-level training and development checks are intentionally outside the current scope.
