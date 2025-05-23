import React, { useState, useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';
import { saveEvents } from './utils/storage';
import './App.css';
import { useDispatch } from 'react-redux';
import { addEvent, updateEvent, deleteEvent, moveEvent } from './features/events/eventSlice';
import { useEvents } from './hooks/useEvents';
import { addDays } from 'date-fns';

export default function App() {
  const events = useEvents();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modal, setModal] = useState({ open: false, event: null, date: null });
  const [view, setView] = useState('monthly');
  const [filter, setFilter] = useState('all');
  const dispatch = useDispatch();

  useEffect(() => {
    saveEvents(events);
  }, [events]);

  const openModal = (date, event = null) => setModal({ open: true, date, event });
  const closeModal = () => setModal({ open: false, event: null, date: null });

  const handleSave = (data) => {
    
    if (data.id) {
      dispatch(updateEvent(data));
    } else {
      dispatch(addEvent(data));
    }
    closeModal();
    saveEvents(events);
  };


  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
    closeModal();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <header>
          <h1>Event Calendar</h1>
          <div className="controls">
            <button onClick={() => setView('monthly')}>Monthly</button>
            <button onClick={() => setView('weekly')}>Weekly</button>
            <select onChange={e => setFilter(e.target.value)} value={filter}>
              <option value="all">All Categories</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="others">Others</option>
            </select>
          </div>
        </header>
        <Calendar
          view={view}
          filter={filter}
          selectedDate={selectedDate}
          onNavigate={setSelectedDate}
          onDateClick={openModal}
          onEventDrop={(id, date) => {
            const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
            dispatch(moveEvent({ id, date: localDate.toISOString() }));
          }}
        />

        {modal.open && (
          <EventForm
            date={modal.date}
            event={modal.event}
            onSave={handleSave}
            onDelete={handleDelete}
            onClose={closeModal}
          />
        )}
      </div>
    </DndProvider>
  );
}