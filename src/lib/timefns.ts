export function ISOToBRStringDate(date: Date): string {
  return `${date.toISOString().slice(8, 10)}/${date
    .toISOString()
    .slice(5, 7)}/${date.toISOString().slice(0, 4)}`;
}

export function dateToBRStringDate(date: Date): string {
  return `${date.toString().slice(8, 10)}/${date.toString().slice(5, 7)}/${date
    .toString()
    .slice(0, 4)}`;
}
