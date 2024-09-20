import React from 'react';
import '../styles/TicketCard.css';

const TicketCard = ({ ticket, priorityIcon }) => {
  return (
    <div className="card-container">
      <div className="card-id-wrapper">
        <span className="card-id">{ticket.id}</span>
        <div className="card-profile">
          <span className="card-profile-initial">{ticket.assigned_user ? ticket.assigned_user[0] : 'U'}</span>
          <div className={`card-profile-initial-available ${ticket.status === 'available' ? 'card-profile-initial-available-true' : ''}`} />
        </div>
      </div>
      <div className="card-title">{ticket.title}</div>
      <p>{ticket.description}</p>
      <div className="card-tag">
        <div className="card-tag-icon">
          <img src={priorityIcon} alt={`${ticket.priority} Priority`} />
        </div>
        <div className="card-tag-box">
          <span className="card-tag-title">{ticket.priority}</span>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
