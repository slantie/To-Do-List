import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {motion} from 'framer-motion';

const localizer = momentLocalizer(moment);

const CalendarPage = ({ tasks }) => {
  const events = tasks.map(task => ({
    id: task.id,
    title: task.description,
    start: new Date(task.date + 'T' + task.time),
    end: new Date(task.date + 'T' + task.time),
    allDay: false,
    resource: task,
  }));

  const calendarVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.resource.priority === 'high' ? '#FCA5A5' : 
                       event.resource.priority === 'medium' ? '#FCD34D' : '#93C5FD',
      borderRadius: '5px',
      opacity: 0.8,
      color: '#000',
      border: 'none',
      display: 'block'
    };
    return {
      style: style
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pt-24 px-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-800">Task Calendar</h1>
      <div className="bg-white rounded-lg shadow-xl p-6" style={{ height: 'calc(100vh - 200px)' }}>
        <motion.div 
            className="bg-white rounded-lg shadow-xl p-6" 
            style={{ height: 'calc(100vh - 200px)' }}
            variants={calendarVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            >
                <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                eventPropGetter={eventStyleGetter}
                views={['month', 'week', 'day']}
                defaultView='month'
                toolbar={true}
                selectable={true}
                popup={true}
                components={{
                    event: EventComponent
                }}
                />
            </motion.div>
      </div>
    </div>
  );
};

const EventComponent = ({ event }) => (
  <div className="p-2">
    <div className="font-semibold">{event.title}</div>
    <div className="text-xs">{moment(event.start).format('HH:mm')}</div>
  </div>
);

export default CalendarPage;
