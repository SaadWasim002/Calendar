import recurrenceOptions from '../utils/recurrenceOptions';
import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { useEvents } from '../hooks/useEvents';

export default function EventForm({ date, event, onSave, onDelete, onClose }) {

  const allEvents = useEvents();

  const [submitted, setSubmitted] = useState(false);
  const [eventDate, setEventDate] = useState('');
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('12:00');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('others');
  const [color, setColor] = useState('#2196F3');
  const [conflict, setConflict] = useState(false);
  const [recurrence, setRecurrence] = useState({
    type: 'none',
    interval: 1,
    days: [],
    frequency: 'daily'
  });

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setEventDate(event.date.slice(0, 10));
      setTime(format(parseISO(event.date), 'HH:mm'));
      setDescription(event.description);
      setCategory(event.category || 'others');
      setColor(event.color || '#2196F3');

      if (typeof event.recurrence === 'string') {
        setRecurrence({
          type: event.recurrence,
          interval: 1,
          days: event.recurrence === 'weekly' ? [new Date(event.date).getDay()] : [],
          frequency: 'daily'
        });
      }
      else {
        setRecurrence(event.recurrence || { type: 'none' });
      }
    }
    else {
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      setEventDate(localDate.toISOString().slice(0, 10));
    }
  }, [event, date]);

  useEffect(() => {
    const checkConflict = () => {
      if (!title || !eventDate || !time)
        return false;

      const [hours, minutes] = time.split(':').map(Number);
      const newDate = new Date(eventDate);
      newDate.setHours(hours, minutes);

      return allEvents.some(ev => {
        if (event?.id === ev.id) return false;
        const evDate = new Date(ev.date);
        return evDate.getTime() === newDate.getTime();
      });
    };

    setConflict(checkConflict());
  }, [title, eventDate, time, allEvents, event?.id]);

  const handleSubmit = () => {
    setSubmitted(true);
    if (!title || conflict) return;

    const [hours, minutes] = time.split(':').map(Number);
    const datetime = new Date(eventDate);
    datetime.setHours(hours, minutes);

    const newEvent = {
      title,
      date: datetime.toISOString(),
      description,
      recurrence: recurrence.type === 'none' ? undefined : recurrence,
      category,
      color,
    };

    if (event?.id) newEvent.id = event.id;
    onSave(newEvent);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>
          {event ? 'Edit' : 'Add'} Event
        </h2>
        <div className="modal-content">
          {conflict && <div className="conflict-warning">⚠️ Time slot conflict detected!</div>}

          <label>
            Title*
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className={submitted && !title ? 'error' : ''}

            />
            {submitted && !title && (
              <div className="error-message">Title is required</div>
            )}
          </label>

          <label>
            Date*
            <input
              type="date"
              value={eventDate}
              onChange={e => setEventDate(e.target.value)}
              required
            />
          </label>

          <label>
            Time*
            <input
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              required
            />
          </label>

          <label>
            Description
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </label>
          <div className="recurrence-options">
            <label>
              Recurrence
              <select
                value={recurrence.type}
                onChange={e => setRecurrence(prev => ({ ...prev, type: e.target.value }))}
              >
                {recurrenceOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>

            {recurrence.type === 'weekly' && (
              <div className="recurrence-options">
                <label>Repeat on:</label>
                <div className="day-checkboxes">
                  {[0, 1, 2, 3, 4, 5, 6].map(day => (
                    <label key={day} className="day-checkbox">
                      <input
                        type="checkbox"
                        checked={recurrence.days?.includes(day)}
                        onChange={(e) => {
                          const days = [...recurrence.days || []];
                          if (e.target.checked) {
                            days.push(day);
                          } else {
                            const index = days.indexOf(day);
                            if (index >= 0) days.splice(index, 1);
                          }
                          setRecurrence(prev => ({ ...prev, days }));
                        }}
                      />
                      {format(new Date(0, 0, day + 1), 'EEE')}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {recurrence.type === 'custom' && (
              <div className="recurrence-options">
                <label>Repeat every</label>
                <input
                  type="number"
                  min="1"
                  value={recurrence.interval || 1}
                  onChange={e => {
                    const interval = Math.max(1, parseInt(e.target.value) || 1);
                    setRecurrence(prev => ({ ...prev, interval }));
                  }}
                  style={{ width: '60px' }}
                />
                <select
                  value={recurrence.frequency || 'daily'}
                  onChange={e => setRecurrence(prev => ({ ...prev, frequency: e.target.value }))}
                >
                  <option value="daily">Days</option>
                  <option value="weekly">Weeks</option>
                  <option value="monthly">Months</option>
                </select>
              </div>
            )}
          </div>
          <label>
            Category
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="others">Others</option>
            </select>
          </label>

        <label>
            Color
            <div className="full-width-color-picker">
              <input
                type="color"
                value={color}
                onChange={e => setColor(e.target.value)}
                id="color-input"
                className="hidden-color-input"
              />
              <label htmlFor="color-input" className="color-rectangle">
                <div 
                  className="color-display" 
                  style={{ backgroundColor: color }}
                >
                  <span className="color-hex-label">{color.toUpperCase()}</span>
                </div>
              </label>
            </div>
          </label>

        </div>
        <div className="actions">
          <button
            onClick={handleSubmit}
            disabled={conflict}
          >
            {event ? 'Update' : 'Add'}
          </button>
          {event && (
            <button
              className="delete-btn"
              onClick={() => onDelete(event.id)}
            >
              Delete
            </button>
          )}
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}