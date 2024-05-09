import moment from 'moment/moment';

export function getTimeStamp(time: string | Date | undefined) {
  if (time === undefined) {
    return undefined;
  }

  const date = moment(time);
  const diffMin = moment().diff(date, 'minutes');
  const diffHour = moment().diff(date, 'hours');
  const diffYear = moment().diff(date, 'year');

  if (diffMin < 1) {
    return 'Now';
  }

  if (diffHour < 1) {
    return date.fromNow();
  }

  if (diffHour < 24) {
    return date.format('h:mm A');
  }

  if (diffYear < 1) {
    return date.format('DD/MM');
  }

  return date.format('DD/MM/YYYY');
}
