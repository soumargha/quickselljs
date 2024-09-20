import React, { useState, useEffect } from 'react';
import TicketCard from '../components/TickedCard';
import Navbar from '../components/navbar';
import '../styles/KanbanBoard.css';
import low from '../assets/icons_FEtask/Img - Low Priority.svg';
import high from '../assets/icons_FEtask/Img - High Priority.svg';
import medium from '../assets/icons_FEtask/Img - Medium Priority.svg';
import urgent from '../assets/icons_FEtask/SVG - Urgent Priority colour.svg';
import nopriority from '../assets/icons_FEtask/No-priority.svg';
import add from '../assets/icons_FEtask/add.svg';
import menu from '../assets/icons_FEtask/menu.svg'

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState('status');
  const [sortBy, setSortBy] = useState('priority');

  useEffect(() => {
    // Fetch tickets data from the API
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets || []);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Function to handle the 'Group by' change
  const handleGroupChange = (group) => {
    setGroupBy(group);
  };

  // Function to handle the 'Sort by' change
  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  // Mapping priorities to image assets
  const priorityIcons = {
    High: high,
    Medium: medium,
    Low: low,
    Urgent: urgent,
    'No Priority': nopriority,
  };

  // Group tickets by the selected 'groupBy' value
  const groupedTickets = tickets.reduce((acc, ticket) => {
    const key = ticket[groupBy] || 'No Priority';
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(ticket);
    return acc;
  }, {});

  // Sort tickets within each group based on the 'sortBy' selection
  const sortTickets = (tickets) => {
    if (sortBy === 'priority') {
      return tickets.sort((a, b) => a.priority - b.priority);
    }
    return tickets.sort((a, b) => a.title.localeCompare(b.title));
  };

  return (
    <div>
      <Navbar onGroupChange={handleGroupChange} onSortChange={handleSortChange} />
      <div className="kanban-board">
      {Object.keys(groupedTickets).map((group) => (
  <div key={group} className="kanban-column">
    <div className="kanban-column-header">
      <h3 className="kanban-column-title">{group}</h3>
      <div className="kanban-column-icons">
        <img src={add} alt="Add ticket" className="add-ticket-icon" />
        <img src={menu} alt="Menu" className="kanban-menu-icon" />  {/* Assuming menuIcon is imported */}
      </div>
    </div>
    {sortTickets(groupedTickets[group]).map((ticket) => (
      <TicketCard 
        key={ticket.id} 
        ticket={ticket} 
        priorityIcon={priorityIcons[ticket.priority] || priorityIcons['No Priority']} 
      />
    ))}
  </div>
))}


      </div>
    </div>
  );
};

export default KanbanBoard;
