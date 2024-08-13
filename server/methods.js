import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

// MongoDB Collections
import { People } from '../people/people';

export function methods() {
  Meteor.methods({
    'people.checkIn': async function checkIn(id) {
      check(id, String); // Validate the ID format

      try {
        const person = await People.findOneAsync(id);
        if (!person || person.checkInTime) {
          throw new Meteor.Error('invalid-operation', 'Cannot check in.');
        }

        await People.updateAsync(
          { _id: id },
          { $set: { checkInTime: new Date().toISOString() } }
        );
      } catch (error) {
        throw new Meteor.Error('database-error', error.message);
      }
    },

    'people.checkOut': async function checkOut(id) {
      check(id, String);

      try {
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

        await People.updateAsync(
          { _id: id },
          { $set: { checkOutTime: currentTime.toISOString() } }
        );
      } catch (error) {
        throw new Meteor.Error('database-error', error.message);
      }
    },
  });
}
