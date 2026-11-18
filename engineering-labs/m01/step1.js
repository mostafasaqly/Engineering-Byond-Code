import { NOW, tasks, users } from './data.js';

import {
  findDueSoon,
  groupByUser,
  buildReminders
} from './reminders.js';

const due = findDueSoon(tasks, NOW);

console.log(
  'Step 1, due soon:',
  due.map((t) => t.id)
);

const groups = groupByUser(due);

console.log(
  'Step 2, users:',
  [...groups.keys()]
);

console.log('Step 3 and 4, the reminders:');

for (const reminder of buildReminders(tasks, users, NOW)) {
  console.log(`\nTo: ${reminder.to}\n${reminder.text}`);
}