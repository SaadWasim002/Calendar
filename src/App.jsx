import { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';
import Header from './components/Header';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { saveEvents } from './utils/storage';
import { useDispatch } from 'react-redux';
import { addEvent, updateEvent, deleteEvent, moveEvent } from './features/events/eventSlice';
import { useEvents } from './hooks/useEvents';
import './App.css';

export default function App() {
  
  const events = useEvents();
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    open: false,
    event: null,
    date: null
  });

  useEffect(() => {
    saveEvents(events);
  }, [events]);

  const openForm = (date, event = null) =>
    setForm({
      open: true,
      date,
      event
    });

  const closeForm = () =>
    setForm({
      open: false,
      event: null,
      date: null
    });

  const handleSave = (data) => {
    if (data.id) {
      dispatch(updateEvent(data));
    } else {
      dispatch(addEvent(data));
    }
    closeForm();
    saveEvents(events);
  };


  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
    closeForm();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <Header
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter} />
        <Calendar
          filter={filter}
          selectedDate={selectedDate}
          onNavigate={setSelectedDate}
          onClickDate={openForm}
          search={search}
          onDrop={(id, date) => {
            const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
            dispatch(moveEvent({ id, date: localDate.toISOString() }));
          }}
        />

       {form.open ? (
          <EventForm
            date={form.date}
            event={form.event}
            onSave={handleSave}
            onDelete={handleDelete}
            onClose={closeForm}
          />
        ) : null}
      </div>
    </DndProvider>
  );
}