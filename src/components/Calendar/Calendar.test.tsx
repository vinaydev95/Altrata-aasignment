import { render, screen } from '@testing-library/react';
import Calendar from './Calendar';

describe('Calendar Component', () => {
  test('renders correct month and year in header', () => {
    const testDate = new Date('2024-01-15');
    render(<Calendar date={testDate} />);
    
    expect(screen.getByText('January 2024')).toBeInTheDocument();
  });

  test('renders all weekdays in correct order', () => {
    const testDate = new Date('2024-01-15');
    render(<Calendar date={testDate} />);
    
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekdayElements = screen.getAllByText(/^(Sun|Mon|Tue|Wed|Thu|Fri|Sat)$/);
    
    expect(weekdayElements).toHaveLength(7);
    weekdayElements.forEach((element, index) => {
      expect(element).toHaveTextContent(weekdays[index]);
    });
  });

  test('highlights the correct current day', () => {
    const testDate = new Date('2024-01-15');
    render(<Calendar date={testDate} />);
    
    const currentDay = screen.getByText('15');
    expect(currentDay).toHaveClass('current-day');
    
   
    const otherDays = screen.getAllByText(/^(1|2|3|14|16|31)$/);
    otherDays.forEach(day => {
      expect(day).not.toHaveClass('current-day');
    });
  });

  test('renders correct number of days for the month', () => {
    const testDate = new Date('2024-01-15');
    render(<Calendar date={testDate} />);
    
   
    const dayElements = screen.getAllByText(/^\d+$/);
    expect(dayElements).toHaveLength(31);
    
  
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('31')).toBeInTheDocument();
  });

  test('renders leap year February correctly', () => {
    const testDate = new Date('2024-02-15');
    render(<Calendar date={testDate} />);
    
    expect(screen.getByText('February 2024')).toBeInTheDocument();
    
  
    const dayElements = screen.getAllByText(/^\d+$/);
    expect(dayElements).toHaveLength(29);
    expect(screen.getByText('29')).toBeInTheDocument();
  });

  test('renders non-leap year February correctly', () => {
    const testDate = new Date('2023-02-15');
    render(<Calendar date={testDate} />);
    
    expect(screen.getByText('February 2023')).toBeInTheDocument();
    

    const dayElements = screen.getAllByText(/^\d+$/);
    expect(dayElements).toHaveLength(28);
    expect(screen.queryByText('29')).not.toBeInTheDocument();
  });
});