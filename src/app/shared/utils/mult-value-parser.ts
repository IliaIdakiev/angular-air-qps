// Parse a multi value query string into { keys, vals }
// For example if we have a muti value query string for sorting
// 'sort=name:asc;username:desc' we will get keys === ['name', 'username'] and
// values === ['asc', 'desc']
export function multiValueParser(values) {
  const pairs = (values || []).map(item => item.split(':'));
  return pairs.reduce(
    ({ keys, vals }: { keys: string[], vals: string[] }, [currKey, currVal]: [string, string]) =>
      ({ keys: keys.concat(currKey), vals: vals.concat(currVal) }),
    { keys: [], vals: [] });
}
