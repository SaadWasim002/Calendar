import { useDrop } from 'react-dnd';
import { format, isBefore, isSameDay, isSameMonth, startOfMonth } from 'date-fns';
import EventItem from './EventItem';

const DateBox = ({
    day, currentMonth, onClick, events ,onDrop , onEventClick   
}) => {
    const isCurrentMonth = isSameMonth(day, currentMonth);
    const isPrevMonth = isBefore(day, startOfMonth(currentMonth));
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'EVENT',
        drop: (item) => onDrop(item.id, day),
        collect: monitor => ({ isOver: !!monitor.isOver() }),
    }));
    return (
        <>
            <div
                ref={drop}
                className={`day-cell 
                    ${!isSameDay(day, new Date()) ? '' : 'today'} 
                    ${!isCurrentMonth ? 'other-month' : ''}
                    ${isPrevMonth ? 'prev-month' : ''}`}
                onClick={onClick}
            >
                <div className="date-label">
                    {format(day, 'd')}
                </div>
                <div className="events-container">
                {events.map(event =>
                     <EventItem
                        key={event.id}
                        event={event}
                        onClick={() => onEventClick(event)}
                    />
                )}
                </div>
            </div>
        </>
    )
}

export default DateBox
