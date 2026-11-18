const HOUR = 60 * 60 * 1000;
export const MAX_LINES = 20;
import { withinWindow, groupBy } from './patterns.js';
import {checkTasks} from './validate.js'
// Step 1: which tasks are due soon?
export function findDueSoon(tasks, now, hours = 24) {
  const limit = new Date(now.getTime() + hours * HOUR);

  const open = tasks.filter((task) => !task.done);
  return withinWindow(open, (task) => task.dueAt, now, limit);
}

// Step 2: group the tasks by user.
export function groupByUser(tasks) {
  return groupBy(tasks, (task) => task.userId);
}

// Step 3: write the message for one user.
export function formatReminder(user, tasks, now) {
  const sorted = [...tasks].sort(
    (a, b) => new Date(a.dueAt) - new Date(b.dueAt));
  const lines = sorted.slice(0, MAX_LINES).map((task) => {
    const hours = Math.round(
      (new Date(task.dueAt) - now) / HOUR
    );

    return `- ${task.title} (in ${hours} h)`;
  });

  const extra = sorted.length - MAX_LINES;

if (extra > 0) {
  lines.push(`... and ${extra} more`);
}

  return `Hi ${user.name}, due soon:\n${lines.join('\n')}`;
}

// Step 4: put the steps together.
export function buildReminders(tasks, users, now) {
  if (!(now instanceof Date)) throw new TypeError('now is not a Date');
  const { valid } = checkTasks(tasks);
  const groups = groupByUser(findDueSoon(valid, now));
  // One Map lookup for each user. Not a search in the whole list.
  const userById = new Map(users.map((user) => [user.id, user]));
  const reminders = [];
  for (const [userId, list] of groups) {
    const user = userById.get(userId);
    const text = formatReminder(user, list, now);
    reminders.push({ userId, to: user.email, text });
  }
  return reminders;
}