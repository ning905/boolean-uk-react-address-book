export function updateArr(arr, newItem) {
  const updated = arr.map((item) => (item.id === newItem.id ? newItem : item));
  return updated;
}

export function filterArr(arr, itemToFilter) {
  const updated = arr.filter((contact) => contact.id !== itemToFilter.id);
  return updated;
}
