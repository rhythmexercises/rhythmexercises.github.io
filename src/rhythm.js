import {Factory, inject} from 'aurelia-framework';
import DataRhythms from 'text!./rhythms.json';
import {Exercise} from 'exercise';

@inject(Factory.of(Exercise))
export class Rhythm {
  exercises: Array<Exercise> = [];

  constructor(exerciseModel) {
    console.log('Rhythm', 'constructor');

    this.french = '';
    this.count = '';
    this.names = [];
    this.notes = [];

    this._exerciseModel = exerciseModel;
  }

  activate(input) {
    console.log('Rhythm', 'activate', input);
    var index = input.index || 0;
    var items = JSON.parse(DataRhythms);
    var item = items[index];

    this.french = item.french;
    this.count = item.count;
    this.names = item.names;
    this.notes = item.notes;

    // Generate exercises.
    // Trim `items` to "before this exercise".
    const newItem = this._exerciseModel(item, items.slice(0, index));
    console.log('newItem', newItem);
    //this.observeItem(newItem);
    this.exercises.push(newItem);
  }

}
