import dayjs from 'dayjs';

function humanizeFullDate(dueDate) {
  return dueDate ? dayjs(dueDate).format('DD/MM/YY HH:mm').toUpperCase() : '';
}

function humanizeDateDay(dueDate) {
  return dueDate ? dayjs(dueDate).format('MMM DD').toUpperCase() : '';
}

function humanizeDateHour(dueDate) {
  return dueDate ? dayjs(dueDate).format('HH:mm').toUpperCase() : '';
}

function humanizeDuration(startTime, endTime) {
  const totalMin = durationToMinutes(startTime, endTime);
  if (totalMin < 60) {
    return `${totalMin}M`;
  }
  const days = Math.floor(totalMin / 1440);
  const hours = Math.floor((totalMin % 1440) / 60);
  const mins = totalMin % 60;
  if (days === 0) {
    return `${String(hours).padStart(2,'0')}H ${String(mins).padStart(2,'0')}M`;
  }
  return `${String(days).padStart(2,'0')}D ${String(hours).padStart(2,'0')}H ${String(mins).padStart(2,'0')}M`;
}

function durationToMinutes(startTime, endTime) {
  return dayjs(endTime).diff(dayjs(startTime), 'minute');
}

export {humanizeDateDay, humanizeDateHour, humanizeDuration, humanizeFullDate, durationToMinutes};
