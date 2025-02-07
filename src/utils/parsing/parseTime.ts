export default function parseTime(date: Date) {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function parseDate(date: any) {
  return new Date(date).toLocaleDateString('hi-IN');
}
