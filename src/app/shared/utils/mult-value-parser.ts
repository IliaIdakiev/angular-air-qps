export function multiValueParser(values) {
  const pairs = (values || []).map(item => item.split(':'));
  return pairs.reduce(
    ({ keys, vals }: { keys: string[], vals: string[] }, [currKey, currVal]: [string, string]) =>
      ({ keys: keys.concat(currKey), vals: vals.concat(currVal) }),
    { keys: [], vals: [] });
}
