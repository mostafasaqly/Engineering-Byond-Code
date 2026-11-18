import { buildReminders } from './reminders.js';

const NOW = new Date('2026-03-02T09:00:00Z');

const USERS = 20_000;
const TASKS = 100_000;

const users = Array.from({ length: USERS }, (_, i) => ({
  id: i,
  name: `User ${i}`,
  email: `user${i}@example.com`,
}));

const tasks = Array.from({ length: TASKS }, (_, i) => ({
  id: i,
  userId: i % USERS,
  title: `Task ${i}`,
  done: false,
  dueAt: new Date(
    NOW.getTime() + ((i % 96) + 1) * 3_600_000
  ).toISOString(),
}));


function report(name, ok, detail) {
  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${name}: ${detail}`
  );

  if (!ok) {
    process.exitCode = 1;
  }
}

// NFR-1 Performance
const start = performance.now();

const reminders = buildReminders(tasks, users, NOW);

const ms = performance.now() - start;

report(
  'NFR-1 speed',
  ms < 200,
  `${ms.toFixed(0)} ms (limit 200)`
);

// NFR-2 Privacy
const titleOwner = new Map(
  tasks.map((t) => [t.title, t.userId])
);

let leaks = 0;

for (const reminder of reminders) {
  for (const title of reminder.text.match(/Task \d+/g) ?? []) {
    if (titleOwner.get(title) !== reminder.userId) {
      leaks++;
    }
  }
}

report(
  'NFR-2 privacy',
  leaks === 0,
  `${leaks} leaked tasks`
);

// NFR-3 Repeatability
const again = buildReminders(tasks, users, NOW);

const same =
  JSON.stringify(again) === JSON.stringify(reminders);

report(
  'NFR-3 repeatable',
  same,
  same ? 'same output' : 'differs'
);

console.log(`Built ${reminders.length} reminders`);