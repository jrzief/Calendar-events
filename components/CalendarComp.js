import {useState, useEffect} from 'react';
import Calendar from 'react-calendar';
import classes from './CalendarComp.module.css';


function CalendarComp() {

    const [calDate, setCalDate] = useState(new Date());
    const [dateAgenda, setDateAgenda] = useState();
    const [monthAgenda, setMonthAgenda] = useState();
    const [showSelectedDate, setShowSelectedDate] = useState(false);
    const [showMonthEvents, setShowMonthEvents] = useState(false);
    //const [selectedDate, setSelectedDate] = useState(new Date('2021-3-15 00:00:00'));

    //console.log('selectedDate', selectedDate);

    const myDate = new Date("3/15/2021").toISOString();
    console.log('myDate', myDate);

    function onChange (calDate) {
        // change results based on calendar date click
        setCalDate(calDate)
    }

    useEffect(() => {
      if (showMonthEvents) {
        fetch('/api/calendarEvents')
          .then((response) => response.json())
          //.then((data) => console.log(data)); 
          .then((data) =>  {
            setMonthAgenda(data);
          });
      }     
         
    }, [showMonthEvents]); 

    useEffect(() => {
      if (showSelectedDate) {
        //const mcalDate = calDate.toLocaleString().split(",")[0];
        fetch(`/api/calendarEvents/12345`)
          .then((response) => response.json())
          //.then((data) => console.log(data)); 
          .then((data) =>  {
            setDateAgenda(data);
          });
      }     
         
    }, [showSelectedDate]); 
 
    function toggleShowSelectedDate() {
      setShowSelectedDate((prevStatus) => !prevStatus);
    }

    function toggleShowEventsByMonth() {
      setShowMonthEvents((prevStatus) => !prevStatus);
    }


    console.log('caldate', calDate);
    console.log('dateAgenda', dateAgenda);
    const newCalDateFormat = calDate.toLocaleString().split(",")[0];
    const newFullCalDateFormat = calDate.toLocaleString();
    console.log('newCalDateFormat', newCalDateFormat);
    return (
      <div>
        <div className={classes['react-calendar']}> 
          <Calendar className={classes['react-calendar__tile--now ']} onChange={onChange} value={calDate} />
        </div>
        <section>
          <button onClick={toggleShowSelectedDate}>
            {showSelectedDate ? 'Hide' : 'Show'} Selected Date Agenda
          </button>
          <button onClick={toggleShowEventsByMonth}>
            {showMonthEvents ? 'Hide' : 'Show'}  Month Agenda
          </button>
        </section>
        <pre>{JSON.stringify(calDate, null, 2)}</pre>
        <pre>{JSON.stringify(newCalDateFormat, null, 2)}</pre>
        <pre>{JSON.stringify(newFullCalDateFormat, null, 2)}</pre>
        <pre>{JSON.stringify(dateAgenda, null, 2)}</pre> 
        <pre>{JSON.stringify(monthAgenda, null, 2)}</pre> 

    </div>
      
    );
}

export default CalendarComp;