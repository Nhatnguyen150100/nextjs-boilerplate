import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';

dayjs.extend(relativeTime);
dayjs.locale('vi');

/**
 * Format a time from now, given a input string | number | Date.
 * If the diff from now is more than 3 days, return the date in 'DD/MM/YYYY' format.
 * Otherwise, return the time from now in dayjs relative time format.
 * @param input string | number | Date
 * @returns string
 */
export function formatTimeFromNow(input: string | number | Date): string {
  const now = dayjs();
  const created = dayjs(input);

  const diffDays = now.diff(created, 'day');

  if (diffDays > 3) {
    return created.format('DD/MM/YYYY');
  }

  return created.fromNow();
}

export function formatTimeToNow(input: string | number | Date): string {
  const now = dayjs();
  const created = dayjs(input);

  const diffDays = now.diff(created, 'day');

  if (diffDays > 3) {
    return created.format('DD/MM/YYYY');
  }

  return created.toNow();
}
