import React, { useState } from 'react';
import Calender from 'react-calendar';
import './Days.css';
// import 'react-calendar/dist/Calendar.css';
import { differenceInCalendarDays } from 'date-fns';

function isSameDay(a, b) {
  return differenceInCalendarDays(a, b) === 0;
}
function is2weeksaway(a,b) {
  return differenceInCalendarDays(a, b) >= 16;
}

function Days(props) {
  const { forecast, weatherCriterea } = props;
  const [minTemp, maxTemp, minWind, maxWind] = weatherCriterea;

  const beachDays = forecast
    .filter((day) => {
      const { temp: { day: t }, speed } = day;
      return (t >= minTemp && t <= maxTemp) && (speed <= maxWind && speed >= minWind);
    });

  const beachDates = beachDays.map((day) => new Date(day.dt * 1000));

  console.log('beachdays: ', beachDays);

  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (beachDates.find((dDate) => {
        return isSameDay(dDate, date)})) {
        console.log(date, 'is a beach day');
        return 'beachDay';
        }
      }
      if (is2weeksaway(date, new Date())) {
        return 'outOfRange';
      }
  }

  function tileContent({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      const aBeachDay = (beachDays
        .find(dDate => isSameDay((dDate.dt*1000), date)))
      if (aBeachDay) {
        return `\n 🏖️ ${Math.ceil(aBeachDay.temp.day)}°F  🏖️`
      }
      // if (beachDays.find((dDate) => {
      //   return isSameDay((dDate.dt*1000), date)})) {
      //   console.log(date, 'is a beach day');
      //   return ('🏖️' + dDate.temp.day);
      // }
    }
  }

  const [value, onChange] = useState(new Date());
  return (
    <div className="days">
      {beachDays.length > 0 ?
      <div>
        <h2>Here are some good days to go to the beach!</h2>
      <Calender value={value} onChange={onChange} tileClassName={tileClassName} tileContent={tileContent}/></div>

      : <div style={{textAlign: 'center'}}>
        <h4>No days meet your criteria ⛈️⛈️⛈️ </h4>
        <br />
        <h4>maybe lower your standards?</h4></div>}
    </div>
  );
}

export default Days;