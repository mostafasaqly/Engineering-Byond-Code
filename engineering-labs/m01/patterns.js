// Two patterns that we found inside the reminder code.
// They do not know about tasks. They work for any list.

// Pattern 1: items with a date inside a time window.
export function withinWindow(items, getDate, from, to) {
  return items.filter((item) => {
    const time = new Date(getDate(item)).getTime();
    return time > from.getTime() && time <= to.getTime();
  });
}

// Pattern 2: group items by a key.
export function groupBy(items, getKey) {
  const groups = new Map();
  for (const item of items) {
    const key = getKey(item);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  return groups;
}
