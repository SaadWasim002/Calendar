import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import recurrenceOptions from '../utils/recurrenceOptions';
import { useDispatch } from 'react-redux';
import { addEvent } from '../features/events/eventSlice';
import { useEvents } from '../hooks/useEvents';

export default function EventForm({ date, event, onSave, onDelete, onClose }) {
  const [eventDate, setEventDate] = useState('');
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('12:00');
  const [description, setDescription] = useState('');
  const [recurrence, setRecurrence] = useState('none');
  const [category, setCategory] = useState('others');
  const [color, setColor] = useState('#2196F3');
  const [conflict, setConflict] = useState(false);
  const dispatch = useDispatch();
  const allEvents = useEvents()
  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setEventDate(event.date.slice(0,10));         // "YYYY-MM-DD"
      setTime(format(new Date(event.date), 'HH:mm'));
      setDescription(event.description);
      setRecurrence(event.recurrence || 'none');
      setCategory(event.category || 'others');
      setColor(event.color || '#2196F3');
    }
    else{
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      setEventDate(localDate.toISOString().slice(0,10));
    }
  }, [event , date]);

  const handleSubmit = () => {
    var datetime;
    if(eventDate !== ''){
      datetime = new Date(eventDate)
    }
    else{
      datetime = new Date(date);
    }
    const [h, m] = time.split(':').map(Number);
    datetime.setHours(h, m);
    
    if(title === '')
      return;
    const newEvent = {
      title,
      date: datetime.toISOString(),
      description,
      recurrence,
      category,
      color,
    };

    if (event?.id) newEvent.id = event.id;
    

    onSave(newEvent);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{event ? 'Edit' : 'Add'} Event</h2>
        <label>Title<input value={title} onChange={e => setTitle(e.target.value)} /></label>
        <label>Date
          <input
            type="date"
            value={eventDate}
            onChange={e => setEventDate(e.target.value)}
          />
        </label>


        <label>Time<input type="time" value={time} onChange={e => setTime(e.target.value)} /></label>
        <label>Description<textarea value={description} onChange={e => setDescription(e.target.value)} /></label>
        <label>Recurrence<select value={recurrence} onChange={e => setRecurrence(e.target.value)}>
          {recurrenceOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select></label>
        <label>Category<select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="others">Others</option>
        </select></label>
        <label>Color<input type="color" value={color} onChange={e => setColor(e.target.value)} /></label>
        <div className="actions">
          <button onClick={handleSubmit}>{event ? 'Update' : 'Add'}</button>
          {event && <button onClick={() => onDelete(event.id)}>Delete</button>}
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}