export const NOW = new Date('2026-03-02T09:00:00Z');
export const users = [
  { id: 1, name: 'Sara', email: 'sara@example.com' },
  { id: 2, name: 'Omar', email: 'omar@example.com' },
  { id: 3, name: 'Lina', email: 'lina@example.com' },
];

export const tasks = [
  {
    id: 1,
    userId: 1,
    title: 'Send the invoice',
    dueAt: '2026-03-02T15:00:00Z',
    done: false
  },
  {
    id: 2,
    userId: 1,
    title: 'Book the meeting room',
    dueAt: '2026-03-03T08:00:00Z',
    done: false
  },
  {
    id: 3,
    userId: 2,
    title: 'Review the pull request',
    dueAt: '2026-03-02T11:30:00Z',
    done: false
  },
  {
    id: 4,
    userId: 2,
    title: 'Update the docs',
    dueAt: '2026-03-05T09:00:00Z',
    done: false
  },
  {
    id: 5,
    userId: 3,
    title: 'Pay the hosting bill',
    dueAt: '2026-03-02T10:00:00Z',
    done: true
  },
  {
    id: 6,
    userId: 3,
    title: 'Call the client',
    dueAt: '2026-03-01T16:00:00Z',
    done: false
  },
];