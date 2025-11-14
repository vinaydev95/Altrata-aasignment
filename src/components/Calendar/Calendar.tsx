import React from 'react';
import { getDaysInMonth, getDay, startOfMonth, format } from 'date-fns';
import './Calendar.css';

interface CalendarProps {
  date: Date;
}

const Calendar: React.FC<CalendarProps> = ({ date }) => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const monthStart = startOfMonth(date);
  const daysInMonth = getDaysInMonth(date);
  const startDay = getDay(monthStart);
  
  const renderCalendarDays = () => {
    const days = [];
    
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty" />);
    }
    
   
    for (let day = 1; day <= daysInMonth; day++) {
      const isCurrentDay = day === date.getDate() && 
                          date.getMonth() === monthStart.getMonth() && 
                          date.getFullYear() === monthStart.getFullYear();
      
      days.push(
        <div 
          key={`day-${day}`} 
          className={`calendar-day ${isCurrentDay ? 'current-day' : ''}`}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="calendar" data-testid="calendar">
      <div className="calendar-header">
        <h2>{format(date, 'MMMM yyyy')}</h2>
      </div>
      
      <div className="calendar-weekdays">
        {weekdays.map(weekday => (
          <div key={weekday} className="calendar-weekday">
            {weekday}
          </div>
        ))}
      </div>
      
      <div className="calendar-days-grid">
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar;