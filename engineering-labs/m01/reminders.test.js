import test from 'node:test';
import assert from 'node:assert/strict';

import { buildReminders } from './reminders.js';

const NOW = new Date('2026-03-02T09:00:00Z');

const users = [
  {
    id: 1,
    name: 'Sara',
    email: 'sara@example.com'
  }
];

const inHours = (h) =>
  new Date(NOW.getTime() + h * 3_600_000)
    .toISOString()
    .replace('.000Z', 'Z');

const task = (id, hours, extra = {}) => ({
  id,
  userId: 1,
  title: `Task ${id}`,
  dueAt: inHours(hours),
  done: false,
  ...extra
});

const build = (tasks) =>
  buildReminders(tasks, users, NOW);


test('AC-1 a task due in 6 hours is in the email', () => {
  assert.match(
    build([task(1, 6)])[0].text,
    /Task 1/
  );
});

test('AC-2 a task due in 3 days is not in the email', () => {
  assert.equal(
    build([task(1, 72)]).length,
    0
  );
});

test('AC-3 a done task is not in the email', () => {
  assert.equal(
    build([task(1, 6, { done: true })]).length,
    0
  );
});

test('AC-4 an overdue task is not in the email', () => {
  assert.equal(
    build([task(1, -2)]).length,
    0
  );
});

test('AC-5 two due tasks of one user give one email', () => {
  const reminders = build([
    task(1, 6),
    task(2, 8)
  ]);

  assert.equal(reminders.length, 1);

  assert.match(
    reminders[0].text,
    /Task 1[\s\S]*Task 2/
  );
});


test('AC-6 the task due first is the first line', () => {
  const text = build([
    task(1, 20),
    task(2, 3)
  ])[0].text;

  assert.ok(
    text.indexOf('Task 2') < text.indexOf('Task 1')
  );
});

test('AC-7 a bad date is skipped, others still work', () => {
  const bad = task(1, 6, {
    dueAt: 'tomorrow'
  });

  const reminders = build([
    bad,
    task(2, 6)
  ]);

  assert.equal(reminders.length, 1);

  assert.doesNotMatch(
    reminders[0].text,
    /Task 1/
  );
});

test('AC-8 25 due tasks give 20 lines and a count', () => {
  const many = Array.from(
    { length: 25 },
    (_, i) => task(i, 2)
  );

  const lines = build(many)[0].text.split('\n');

  assert.equal(lines.length, 22);

  assert.equal(
    lines.at(-1),
    '... and 5 more'
  );
});