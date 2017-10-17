export function cleanString(string) {
  return string.replace(/(\r\n|\n|\r|\t|<(?:.|\n)*?>)/gm, '').replace(/&#xA0;/gm, ' ').trim();
}

export function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) { return val; }

  if (port >= 0) { return port; }

  return false;
}