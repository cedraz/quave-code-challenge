import React from 'react';

// Hooks
import { useEventData } from '../hooks/useEventData';

// Components
import { SelectCommunityMenu } from './SelectCommunity';
import { PeopleList } from './PeopleList';
import { Summary } from './Summary';
import { useSummaryData } from '../hooks/useSummaryData';

const EventList = () => {
  const [selectedCommunityId, setSelectedCommunityId] = React.useState(null);

  const { communities, people, isLoading, handleCheckIn, handleCheckOut } =
    useEventData({
      selectedCommunityId,
    });

  const { peopleCheckedIn, peopleNotCheckedIn, companyGroups } = useSummaryData(
    {
      people,
      selectedCommunityId,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSelectCommunity = (communityId) => {
    setSelectedCommunityId(communityId);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex max-w-screen-2xl flex-col items-center justify-between gap-3 sm:flex-row">
        <SelectCommunityMenu
          communities={communities}
          onSelect={handleSelectCommunity}
        />

        <Summary
          peopleCheckedIn={peopleCheckedIn}
          peopleNotCheckedIn={peopleNotCheckedIn}
          companyGroups={companyGroups}
        />
      </div>

      {people.length > 0 && selectedCommunityId && (
        <PeopleList
          people={people}
          handleCheckIn={handleCheckIn}
          handleCheckOut={handleCheckOut}
        />
      )}
    </div>
  );
};

export { EventList };
