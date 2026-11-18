import { NOW, tasks, users } from './data.js';
import { buildReminders } from './reminders.js';
import { withinWindow, groupBy } from './patterns.js';

// The reminders still work after the change.
const reminders = buildReminders(tasks, users, NOW);
console.log('Reminders for users:', reminders.map((r) => r.userId));

// The same patterns solve a different problem: invoices.
const invoices = [
  { id: 'INV-1', customer: 'Acme', payBy: '2026-03-04T00:00:00Z' },
  { id: 'INV-2', customer: 'Acme', payBy: '2026-03-20T00:00:00Z' },
  { id: 'INV-3', customer: 'Nile', payBy: '2026-03-06T12:00:00Z' },
];
const week = new Date(NOW.getTime() + 7 * 24 * 60 * 60 * 1000);
const soon = withinWindow(invoices, (i) => i.payBy, NOW, week);
const byCustomer = groupBy(soon, (i) => i.customer);

console.log('Invoices to pay this week:');
for (const [customer, list] of byCustomer) {
  console.log(`- ${customer}: ${list.map((i) => i.id).join(', ')}`);
}
