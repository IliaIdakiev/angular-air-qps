// Update the existing multi value query string with thew new value for the provided
// name. If the value is empty - remove it.
export function multiValueHandler(current, name, value) {
  current = current.map(item => item.split(':'));
  const changeIndex = current.findIndex(([n]) => n === name);
  if (changeIndex === -1 && value) {
    current = current.concat([[name, value]]);
  } else if (changeIndex !== -1) {
    if (value) {
      current = [
        ...current.slice(0, changeIndex),
        [name, value],
        ...current.slice(changeIndex + 1)
      ];
    } else {
      current = [
        ...current.slice(0, changeIndex),
        ...current.slice(changeIndex + 1)
      ];
    }
  }
  return current.map(item => item.join(':')).join(';') || undefined;
}
