export const loadEvents = () => {
  const data = localStorage.getItem('events');
  return data ? JSON.parse(data) : [];
};

export const saveEvents = (events) => {
  localStorage.setItem('events', JSON.stringify(events));
};