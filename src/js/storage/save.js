export function save(key, value) {
  localStorage(key, JSON.stringify(value));
}
