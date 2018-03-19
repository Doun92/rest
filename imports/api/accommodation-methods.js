import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


//Collection pour les logements
export const Accommodation = new Mongo.Collection('accommodations');
