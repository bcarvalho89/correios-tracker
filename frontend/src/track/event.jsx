import React from 'react';

export default props => {
  let event = props.data;

  return (
    <div className="event">
      <div className="event__status">{event.status}</div>
      <div className="event__date"><span className="event-label">Quando?</span> {event.date}</div>
      <div className="event__location"><span className="event-label">Onde?</span> {event.location}</div>
    </div>
  )
};
