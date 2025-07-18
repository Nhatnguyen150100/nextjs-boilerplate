type DateFormat =
  | 'dd/MM/yyyy'
  | 'dd-MM-yyyy'
  | 'yyyy/MM/dd'
  | 'yyyy-MM-dd'
  | 'MM/dd/yyyy'
  | 'MMM dd, yyyy'
  | 'MMMM dd, yyyy'
  | 'dd MMM yyyy'
  | 'dd MMMM yyyy'
  | 'yyyyMMdd'
  | 'HH:mm:ss'
  | 'hh:mm:ss a'
  | 'dd/MM/yyyy HH:mm'
  | 'yyyy/MM/dd HH:mm'
  | 'HH:mm dd/MM/yyyy';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const shortMonthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function isValidDateObject(date: Date): boolean {
  return date instanceof Date && !Number.isNaN(date.getTime());
}

export function formatDate(
  date: Date | string,
  formatString: DateFormat = 'yyyy-MM-dd',
): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  if (!isValidDateObject(d)) {
    return 'Invalid Date';
  }

  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();

  const hour12 = hours % 12 || 12;
  const ampm = hours < 12 ? 'AM' : 'PM';

  const pad = (num: number) => num.toString().padStart(2, '0');

  switch (formatString) {
    case 'dd/MM/yyyy':
      return `${pad(day)}/${pad(month)}/${year}`;
    case 'dd-MM-yyyy':
      return `${pad(day)}-${pad(month)}-${year}`;
    case 'yyyy/MM/dd':
      return `${year}/${pad(month)}/${pad(day)}`;
    case 'yyyy-MM-dd':
      return `${year}-${pad(month)}-${pad(day)}`;
    case 'MM/dd/yyyy':
      return `${pad(month)}/${pad(day)}/${year}`;
    case 'MMM dd, yyyy':
      return `${shortMonthNames[d.getMonth()]} ${pad(day)}, ${year}`;
    case 'MMMM dd, yyyy':
      return `${monthNames[d.getMonth()]} ${pad(day)}, ${year}`;
    case 'dd MMM yyyy':
      return `${pad(day)} ${shortMonthNames[d.getMonth()]} ${year}`;
    case 'dd MMMM yyyy':
      return `${pad(day)} ${monthNames[d.getMonth()]} ${year}`;
    case 'yyyyMMdd':
      return `${year}${pad(month)}${pad(day)}`;
    case 'HH:mm:ss':
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    case 'hh:mm:ss a':
      return `${pad(hour12)}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
    case 'dd/MM/yyyy HH:mm':
      return `${pad(day)}/${pad(month)}/${year} ${pad(hours)}:${pad(minutes)}`;
    case 'yyyy/MM/dd HH:mm':
      return `${year}/${pad(month)}/${pad(day)} ${pad(hours)}:${pad(minutes)}`;
    case 'HH:mm dd/MM/yyyy':
      return `${pad(hours)}:${pad(minutes)} ${day}/${pad(month)}/${pad(year)}`;
    default:
      return d.toString();
  }
}

export function isValidDate(dateString: string): boolean {
  const isoRegex = /^\d{4}-\d{2}-\d{2}$/;
  const dmyRegex = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!isoRegex.test(dateString) && !dmyRegex.test(dateString)) {
    return false;
  }

  const d = new Date(dateString);
  return isValidDateObject(d);
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function compareDates(date1: Date, date2: Date): number {
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

  if (d1 < d2) return -1;
  if (d1 > d2) return 1;
  return 0;
}

export function getCurrentTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
