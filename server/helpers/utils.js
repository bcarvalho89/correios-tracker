export function cleanString(string) {
  return string.replace(/(\r\n|\n|\r|\t|<(?:.|\n)*?>)/gm, '').replace(/&#xA0;/gm, ' ').trim();
}