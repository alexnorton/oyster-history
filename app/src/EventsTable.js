import React from 'react';
import dayjs from 'dayjs';

const EventsTable = ({ events }) => (
  <table>
    <thead>
      <tr>
        <th>Start time</th>
        <th>End time</th>
        <th>Action</th>
        <th>Charge</th>
        <th>Balance</th>
      </tr>
    </thead>
    {events
      .sort((a, b) => b.sortTime - a.sortTime)
      .reduce((days, event) => {
        const date = dayjs(event.sortTime).startOf('day');

        if (days[days.length - 1] && days[days.length - 1].date.isSame(date)) {
          days[days.length - 1].events.push(event);
          return days;
        }

        return [
          ...days,
          {
            date,
            events: [event],
          },
        ];
      }, [])
      .map(({ date, events }) => (
        <tbody key={date.toString()}>
          <tr>
            <td colSpan="5" style={{ backgroundColor: 'rgb(208, 232, 240)' }}>
              {date.format('dddd, D MMMM YYYY')}
            </td>
          </tr>
          {events.map((event, index) => (
            <tr key={index}>
              <td>
                {event.startTime && dayjs(event.startTime).format('HH:mm')}
              </td>
              <td>{event.endTime && dayjs(event.endTime).format('HH:mm')}</td>
              <td>{event.action}</td>
              <td style={{ textAlign: 'right' }}>
                {event.charge !== null
                  ? `£${event.charge.toFixed(2)}`
                  : `+£${event.credit.toFixed(2)}`}
              </td>
              <td style={{ textAlign: 'right' }}>
                {event.balance !== null && `£${event.balance.toFixed(2)}`}
              </td>
            </tr>
          ))}
        </tbody>
      ))}
  </table>
);

export default EventsTable;
