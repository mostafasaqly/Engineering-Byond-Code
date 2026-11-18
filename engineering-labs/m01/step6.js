import { NOW, tasks, users } from './data.js';
import { buildReminders } from './reminders.js';
import { checkTasks } from './validate.js';

const messy = [
  ...tasks,

  {
    id: 7,
    userId: 1,
    title: 'Local time',
    done: false,
    dueAt: '2026-03-02 14:00'
  },

  {
    id: 8,
    userId: 2,
    title: '   ',
    done: false,
    dueAt: '2026-03-02T14:00:00Z'
  },

  {
    id: 9,
    userId: 2,
    title: 'Day 45',
    done: false,
    dueAt: '2026-02-45T10:00:00Z'
  }
];

const { valid, problems } = checkTasks(messy);

console.log(`Valid tasks: ${valid.length} of ${messy.length}`);

for (const { id, problem } of problems) {
  console.log(`- task ${id}: ${problem}`);
}

const reminders = buildReminders(messy, users, NOW);

console.log('Reminders built:', reminders.length);



const many = Array.from({ length: 25 }, (_, i) => ({
  id: 100 + i,
  userId: 1,
  title: `Task ${i + 1}`,
  done: false,
  dueAt: new Date(
    NOW.getTime() + (i + 1) * 1_800_000
  ).toISOString().replace('.000Z', 'Z')
}));

const lines = buildReminders(
  many,
  users,
  NOW
)[0].text.split('\n');

console.log('Lines in a 25 task email:', lines.length);
console.log('Last line:', lines.at(-1));


try {
  buildReminders(tasks, users, '2026-03-02');
} catch (error) {
  console.log('Wrong "now":', error.message);
}