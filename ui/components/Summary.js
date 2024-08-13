import React from 'react';

const SummaryCard = ({ title, value }) => (
  <div className="flex h-fit w-fit max-w-[1000px] flex-col gap-5 rounded-md bg-white p-4 shadow-md">
    <h3 className="text-base">{title}</h3>
    {/* <p className='text-xl font-semibold'>{value}</p> */}
    {typeof value === 'string' ? (
      <p className="text-lg font-semibold">{value}</p>
    ) : (
      <p className="text-5xl font-semibold">{value}</p>
    )}
  </div>
);

export function Summary({
  peopleCheckedIn,
  peopleNotCheckedIn,
  companyGroups,
}) {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <SummaryCard title="People checked in" value={peopleCheckedIn} />
        <SummaryCard title="People not checked in" value={peopleNotCheckedIn} />
        <SummaryCard title="Companies" value={companyGroups} />
      </div>
    </div>
  );
}
