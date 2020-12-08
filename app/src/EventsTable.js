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
            <td colSpan="5" className="text-sm bg-gray-200">
              {date.format('dddd, D MMMM YYYY')}
            </td>
          </tr>
          {events.map((event, index) => (
            <tr key={index} className="py-2">
              <td>
                {event.startTime && dayjs(event.startTime).format('HH:mm')}
              </td>
              <td>{event.endTime && dayjs(event.endTime).format('HH:mm')}</td>
              <td>{event.action}</td>
              <td className="text-right">
                {event.charge !== null
                  ? `£${event.charge.toFixed(2)}`
                  : `+£${event.credit.toFixed(2)}`}
              </td>
              <td className="text-right">
                {event.balance !== null && `£${event.balance.toFixed(2)}`}
              </td>
            </tr>
          ))}
        </tbody>
      ))}
  </table>
);

export default EventsTable;
