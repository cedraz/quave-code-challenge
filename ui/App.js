import React from 'react';
import { EventList } from './event/EventList';

export const App = () => (
  <div className="flex h-screen w-full flex-col items-center justify-center">
    <h1 className="text-lg font-bold">Event Check-in</h1>
    <div className="p-5">
      <EventList />
    </div>
  </div>
);
