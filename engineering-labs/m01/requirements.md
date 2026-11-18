# Task reminders: requirements

The request from the product owner:
"Remind users before their tasks are due."

## Questions we asked, and the answers

| Question | Answer |
|---|---|
| How long before? | 24 hours or less before the due time. |
| Done tasks? | No reminder. |
| Overdue tasks? | Not in this feature. A later feature. |
| One email for each task? | No. One email for each user. |
| In which order? | The task that is due first comes first. |
| Which channel? | Email only, for now. |

## User story

As a TaskFlow user, I want one email that lists my tasks
due in the next 24 hours, so that I do not miss a deadline.

## Examples (they become tests)

1. A task due in 6 hours is in the reminder.
2. A task due in 3 days is not in the reminder.
3. A done task is not in the reminder.
4. An overdue task is not in the reminder.
5. A user with two due tasks gets one email with both.
6. The task that is due first is first in the email.