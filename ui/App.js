import React from 'react';
import { EventList } from './components/EventList';

export const App = () => (
  <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-100">
    <h1 className="text-5xl font-bold">Event Check-in</h1>
    <div className="p-5">
      <EventList />
    </div>
  </div>
);
