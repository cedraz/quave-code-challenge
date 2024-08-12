import { Meteor } from 'meteor/meteor';
import { loadInitialData } from '../infra/initial-data';
import { Communities } from '../communities/communities';
import { People } from '../people/people';
import { check } from 'meteor/check';

Meteor.startup(async () => {
  // DON'T CHANGE THE NEXT LINE
  await loadInitialData();

  // YOU CAN DO WHATEVER YOU WANT HERE
  Meteor.publish('communities', () => Communities.find());
  Meteor.publish('people', () => People.find());

  Meteor.methods({
    'people.checkIn': async function checkIn(id) {
      check(id, String); // Valida o formato do ID
      const person = await People.findOneAsync(id);
      if (!person || person.checkInTime) {
        throw new Meteor.Error('invalid-operation', 'Cannot check in.');
      }

      People.updateAsync(
        { _id: id },
        { $set: { checkInTime: new Date().toISOString() } }
      );
    },
  });

  Meteor.methods({
    'people.checkOut': async function checkOut(id) {
      check(id, String); // Valida o formato do ID
      const person = await People.findOneAsync(id);

      if (!person || !person.checkInTime || person.checkOutTime) {
        throw new Meteor.Error('invalid-operation', 'Cannot check out.');
      }

      const currentTime = new Date();
      const checkInDate = new Date(person.checkInTime);
      const differenceInSeconds = (currentTime - checkInDate) / 1000;

      if (differenceInSeconds <= 5) {
        throw new Meteor.Error(
          'too-soon',
          'You cannot check out before 5 seconds have passed.'
        );
      }

      People.updateAsync(
        { _id: id },
        { $set: { checkOutTime: new Date().toISOString() } }
      );
    },
  });
});
