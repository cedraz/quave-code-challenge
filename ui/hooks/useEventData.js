import { Communities } from '../../communities/communities';
import { People } from '../../people/people';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

export const useEventData = ({ selectedCommunityId }) => {
  const { communities, people, isLoading } = useTracker(() => {
    const communityHandler = Meteor.subscribe('communities');
    const peopleHandler = Meteor.subscribe('people');

    if (!communityHandler.ready() || !peopleHandler.ready()) {
      return { communities: [], people: [], isLoading: true };
    }

    const fetchedCommunities = Communities.find({}).fetch();

    const fetchedPeople = People.find({
      communityId: selectedCommunityId,
    }).fetch();

    return {
      communities: fetchedCommunities,
      people: fetchedPeople,
      isLoading: false,
    };
  }, [selectedCommunityId]);

  const handleCheckIn = (personId) => {
    Meteor.call('people.checkIn', personId, (error) => {
      if (error) {
        console.error(error);
      }
    });
  };

  const handleCheckOut = (personId) => {
    Meteor.call('people.checkOut', personId, (error) => {
      if (error) {
        console.error(error);
      }
    });
  };

  return {
    communities,
    people,
    isLoading,
    handleCheckIn,
    handleCheckOut,
  };
};
