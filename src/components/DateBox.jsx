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
                <div className="date-label">
                    {format(day, 'd')}
                </div>
                {events.map(event =>
                     <EventItem
                        key={event.id}
                        event={event}
                        onClick={() => onEventClick(event)}
                    />
                )}
            </div>
        </>
    )
}

export default DateBox
