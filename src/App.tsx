import Calendar from './components/Calendar/Calendar';
import './App.css';

function App() {
return (
    <div className="App">
      <header className="App-header">
        <h1>Calendar Demo</h1>
      </header>
      <div className="calendar-container">
        <div className="calendar-wrapper">
         <Calendar date={new Date('2025-10-10')} />
        </div>
      </div>
    </div>
  );
}

export default App;