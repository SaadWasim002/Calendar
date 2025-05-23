import { addDays, addWeeks, addMonths, startOfDay } from 'date-fns';

export const recurringDates = (event, startDate, endDate) => {
  const eventStart = startOfDay(new Date(event.date));
  const occurrences = [];
  let current = startOfDay(eventStart);

  const recurrence = event.recurrence || { type: 'none' };

  const isWithinRange = (date) => date >= startDate && date <= endDate;

  switch (recurrence.type) {
    case 'none':
      if (isWithinRange(current)) occurrences.push(current);
      break;

    case 'daily': {
      const interval = recurrence.interval || 1;
      while (current <= endDate) {
        if (current >= startDate) occurrences.push(new Date(current));
        current = addDays(current, interval);
      }
      break;
    }

    case 'weekly': {
      const interval = recurrence.interval || 1;
      const days = recurrence.days || [eventStart.getDay()];
      let weekStart = addDays(current, -current.getDay()); 
      for (let week = 0; weekStart <= endDate; week += interval) {
        for (const day of days) {
          const date = addDays(weekStart, day);
          if (date >= eventStart && isWithinRange(date)) {
            occurrences.push(new Date(date));
          }
        }
        weekStart = addWeeks(weekStart, interval);
      }
      break;
    }

    case 'monthly': {
      const interval = recurrence.interval || 1;
      while (current <= endDate) {
        if (isWithinRange(current)) occurrences.push(new Date(current));
        current = addMonths(current, interval);
        if (current.getDate() !== eventStart.getDate()) {
          current.setDate(0); 
        }
      }
      break;
    }

    case 'custom': {
      const interval = recurrence.interval || 1;
      const frequency = recurrence.frequency || 'daily';
      let adder;
      switch (frequency) {
        case 'daily':
          adder = (date, int) => addDays(date, int);
          break;
        case 'weekly':
          adder = (date, int) => addWeeks(date, int);
          break;
        case 'monthly':
          adder = (date, int) => addMonths(date, int);
          break;
        default:
          adder = (date) => date;
      }
      while (current <= endDate) {
        if (isWithinRange(current)) occurrences.push(new Date(current));
        current = adder(new Date(current), interval);
      }
      break;
    }

    default:
      break;
  }

  return occurrences;
};