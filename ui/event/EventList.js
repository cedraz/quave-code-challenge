import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { SelectCommunityMenu } from './selectCommunityMenu';
import { Communities } from '../../communities/communities';
import { People } from '../../people/people';
import { PeopleList } from './PeopleList';
import { Summary } from './Summary';
import { Alert } from 'flowbite-react';

const EventList = () => {
  const [selectedCommunityId, setSelectedCommunityId] = React.useState(null);

  const { communities, people, isLoading } = useTracker(() => {
    const communityHandler = Meteor.subscribe('communities');
    const peopleHandler = Meteor.subscribe('people');

    if (!communityHandler.ready() || !peopleHandler.ready()) {
      return { communities: [], people: [], isLoading: true };
    }

    const fetchedCommunities = Communities.find({}).fetch();
    const fetchedPeople = People.find().fetch();

    return {
      communities: fetchedCommunities,
      people: fetchedPeople,
      isLoading: false,
    };
  }, [selectedCommunityId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSelectCommunity = (communityId) => {
    setSelectedCommunityId(communityId);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <SelectCommunityMenu
          communities={communities}
          onSelect={handleSelectCommunity}
        />
        <Summary
          people={people}
          currentEventId={selectedCommunityId}
          events={communities}
        />
      </div>
      {people.length > 0 && selectedCommunityId ? (
        <PeopleList people={people} currentEventId={selectedCommunityId} />
      ) : (
        <Alert color="warning" rounded>
          <span className="font-medium">No event selected!</span>
        </Alert>
      )}
    </div>
  );
};

export { EventList };
