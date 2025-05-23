import DateBox from './dateBox';
import { startOfMonth, endOfMonth, startOfWeek, addDays, format, isSameDay } from 'date-fns'
import { useEvents } from '../hooks/useEvents';
import { recurringDates } from '../utils/recurringDates';


const Calendar = ({
    filter,
    selectedDate,
    onNavigate,
    onClickDate,
    onDrop,
    search
}) => {
    
    const events = useEvents();
    
    const startDate = startOfWeek(startOfMonth(selectedDate));
    const endDate = endOfMonth(selectedDate);
    
    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const days = [];
    let day = startDate;

    while (day <= endDate) {
        days.push(day);
        day = addDays(day, 1);
    }
    
    const filtered = events.filter(event => {
        const category = filter === 'all' || event.category === filter;
        const searched = search?.trim().toLowerCase();
        const matchesSearch = !searched || event.title.toLowerCase().includes(searched) || (event.description && event.description.toLowerCase().includes(searched));
        return category && matchesSearch;
    });

    const startBox = days.length > 0 ? days[0] : startDate;
    const endBox = days.length > 0 ? days[days.length - 1] : endDate;

    const recurrenceEvent = filtered.map(event => ({
        event,
        occurrences: recurringDates(event, startBox, endBox)
    }));
    

    return (
        <>
            <div className="calendar">
                <div className="nav">
                    <button onClick={() => onNavigate(addDays(selectedDate, -30))}>
                        &lt;
                    </button>
                    <span>{format(selectedDate, 'MMMM yyyy')}</span>
                    <button onClick={() => onNavigate(addDays(selectedDate, 30))}>
                        &gt;
                    </button>
                </div>
                <div className="grid">
                    {week.map(day => <div key={day} className="day-name">{day}</div>)}
                    {days.map((dayItem, idx) => (
                        <DateBox
                            key={idx}
                            day={dayItem}
                            currentMonth={selectedDate}
                            events={recurrenceEvent.filter(({ occurrences }) =>
                                    occurrences.some(occ => isSameDay(occ, dayItem))
                                )
                                .map(({ event }) => event)}
                            onClick={() => onClickDate(dayItem)}
                            onDrop={onDrop}
                            onEventClick={(event) => onClickDate(dayItem, event)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Calendar