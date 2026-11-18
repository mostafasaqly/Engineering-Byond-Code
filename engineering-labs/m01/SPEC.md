# Spec: task reminders (version 1)

## Problem
Users miss deadlines because TaskFlow does not tell them
that a task is due soon.

## Functional requirements
- FR-1 A user gets one email that lists the open tasks
  due in the next 24 hours.
- FR-2 Done tasks and overdue tasks are not in the email.
- FR-3 The task that is due first is first in the email.

## Non-functional requirements
- NFR-1 Speed: 100,000 tasks are processed in under 200 ms.
- NFR-2 Privacy: an email has only tasks of its own user.
- NFR-3 Repeatable: the same input gives the same output.

## Constraints
- C-1 Email only. No push or SMS in version 1.
- C-2 An email shows 20 tasks at most, then "... and N more".
- C-3 No new servers. It runs inside the existing API server.

## Assumptions
- A-1 All due dates are stored as UTC strings.
- A-2 A task belongs to one user.
- A-3 A company has less than 50,000 users.

## Out of scope
Overdue reminders, user settings, time zones in the text.

## Acceptance criteria
| Id | Example |
|---|---|
| AC-1 | A task due in 6 hours is in the email |
| AC-2 | A task due in 3 days is not in the email |
| AC-3 | A done task is not in the email |
| AC-4 | An overdue task is not in the email |
| AC-5 | Two due tasks of one user give one email |
| AC-6 | The task due first is the first line |
| AC-7 | A task with a bad date is skipped, others still work |
| AC-8 | 25 due tasks give 20 lines and "... and 5 more" |