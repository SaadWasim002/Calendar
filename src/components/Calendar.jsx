import React from 'react'
import { startOfMonth, endOfMonth, startOfWeek, addDays, format, isSameMonth, isSameDay } from 'date-fns'
import DateBox from './dateBox';
import { useEvents } from '../hooks/useEvents';


const Calendar = ({
    view , filter, selectedDate, onNavigate, onDateClick, onEventDrop 
}) => {
    const startDate = startOfWeek(startOfMonth(selectedDate));
    const endDate = endOfMonth(selectedDate);
    const days = [];
    let day = startDate;
    while (day <= endDate || days.length % 7 !== 0) {
        days.push(day);
        day = addDays(day, 1);
    }
    const events = useEvents();
    const filteredEvents = events.filter(ev => filter === 'all' || ev.category === filter); 

    return (
        <>
            <div className="calendar">
                <div className="nav">
                    <button onClick={() => onNavigate(addDays(selectedDate, -30))}>&lt;</button>
                    <span>{format(selectedDate, 'MMMM yyyy')}</span>
                    <button onClick={() => onNavigate(addDays(selectedDate, 30))}>&gt;</button>
                </div>
                <div className="grid">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="day-name">{day}</div>)}
                    {days.map((dayItem, idx) => (
                        <DateBox
                            key={idx}
                            day={dayItem}
                            currentMonth={selectedDate}
                            events={filteredEvents.filter(ev => isSameDay(new Date(ev.date), dayItem))}
                            onClick={() => onDateClick(dayItem)}
                            onDrop={onEventDrop}
                            onEventClick={(event) => onDateClick(dayItem, event)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Calendar