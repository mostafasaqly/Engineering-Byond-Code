// Our assumptions about the input, written as code.

const UTC_DATE =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;

export function taskProblem(task) {
  if (!Number.isInteger(task.id)) {
    return 'id must be a number';
  }

  if (!Number.isInteger(task.userId)) {
    return 'userId is missing';
  }

  if (
    typeof task.title !== 'string' ||
    !task.title.trim()
  ) {
    return 'title is empty';
  }

  if (!UTC_DATE.test(task.dueAt)) {
    return 'dueAt is not a UTC date';
  }

  if (Number.isNaN(new Date(task.dueAt).getTime())) {
    return 'dueAt is not a real date';
  }

  return null;
}

export function checkTasks(tasks) {
  const valid = [];
  const problems = [];

  for (const task of tasks) {
    const problem = taskProblem(task);

    if (problem) {
      problems.push({
        id: task.id,
        problem
      });
    } else {
      valid.push(task);
    }
  }

  return { valid, problems };
}