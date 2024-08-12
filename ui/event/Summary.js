import React from 'react';

export function Summary({ people, currentEventId, events }) {
  const peopleCheckedIn = people.filter(
    (person) =>
      person.checkInTime &&
      !person.checkOutTime &&
      person.communityId === currentEventId
  ).length;

  const peopleCheckedByEvent = events
    .map((event) => {
      const peopleChecked = people.filter(
        (person) => person.checkInTime && person.communityId === event._id
      ).length;
      return `${event.name} (${peopleChecked})`;
    })
    .join(', ');

  const peopleNotCheckedIn = people.filter(
    (person) => !person.checkInTime && person.communityId === currentEventId
  ).length;

  return (
    <div>
      <h2>Summary</h2>
      <div>
        <h3>People in the event right now: {peopleCheckedIn}</h3>
      </div>
      <div>
        <h3>
          People by company in the event right now: {peopleCheckedByEvent}
        </h3>
      </div>
      <div>
        <h3>People not checked in: {peopleNotCheckedIn}</h3>
      </div>
    </div>
  );
}
