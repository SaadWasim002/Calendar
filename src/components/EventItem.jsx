import React from 'react';
import { useDrag } from 'react-dnd';

export default function EventItem({ event , onClick }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'EVENT',
    item: { id: event.id },
    collect: monitor => ({ isDragging: !!monitor.isDragging() }),
  }));

  return (
    <div
        ref={drag}
        className="event-item" 
        style={{ opacity: isDragging ? 0.5 : 1, backgroundColor: event.color }} 
        onClick={(e) => {
            e.stopPropagation();
            onClick?.();
        }
    }>
      {event.title}
    </div>
  );
}