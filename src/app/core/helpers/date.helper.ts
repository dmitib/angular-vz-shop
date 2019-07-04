// Может быть применить стандартный пайп Date в коде?
export function getIsoDate(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const mm = month < 10 ? '0' + month : month;
  const dd = day < 10 ? '0' + day : day;

  return `${year}-${mm}-${dd}`;
}
