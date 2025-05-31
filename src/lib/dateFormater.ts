export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`;
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${month}/${day}/${year}`;
}
