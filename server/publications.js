import { Meteor } from 'meteor/meteor';

// MongoDB Collections
import { Communities } from '../communities/communities';
import { People } from '../people/people';

export function publications() {
  Meteor.publish('communities', () => Communities.find());
  Meteor.publish('people', () => People.find());
}
