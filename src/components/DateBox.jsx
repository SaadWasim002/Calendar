import React from 'react'
import { useDrop } from 'react-dnd';
import { format, isSameDay } from 'date-fns';
import EventItem from './EventItem';

const DateBox = ({
    day, currentMonth, onClick, events ,onDrop , onEventClick   
}) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'EVENT',
        drop: (item) => onDrop(item.id, day),
        collect: monitor => ({ isOver: !!monitor.isOver() }),
    }));
    return (
        <>
            <div
                ref={drop}
                className={`day-cell ${!isSameDay(day, new Date()) ? '' : 'today'}`}
                onClick={onClick}
            >
                <div className="date-label">{format(day, 'd')}</div>
                {events.map(ev => <EventItem key={ev.id} event={ev} onClick={() => onEventClick(ev)}/>)}
            </div>
        </>
    )
}

export default DateBox