import { findDueSoon } from './reminders.js';

const users = 50_000;
const openTasksPerUser = 8;

const dueEachDay = 0.2;
const peakHourShare = 0.6;

const openTasks = users * openTasksPerUser; //400000

const perDay = openTasks * dueEachDay; // 80_000

console.log('Open tasks:', openTasks.toLocaleString('en'));
console.log('Reminders per day:', perDay.toLocaleString('en'));


const average = perDay / (24 * 60 * 60);

const peak = (perDay * peakHourShare) / (60 * 60);

console.log('Average per second:', average.toFixed(2)); // 0.93
console.log('Peak per second:', peak.toFixed(1)); // 13.3


const now = new Date('2026-03-02T09:00:00Z');

const tasks = Array.from({ length: openTasks }, (_, i) => ({
  id: i,
  userId: i % users,
  done: false,
  dueAt: new Date(
    now.getTime() + (i % 120) * 3_600_000
  ).toISOString(),
}));


const start = performance.now();

const due = findDueSoon(tasks, now);

const ms = performance.now() - start;

console.log(
  `One scan of ${openTasks.toLocaleString('en')} tasks:`,
  `${ms.toFixed(0)} ms, found ${due.length.toLocaleString('en')}`
);

const share = (ms / 60_000) * 100;

console.log(
  `A scan every minute uses ${share.toFixed(2)}%`,
  'of one CPU core'
);