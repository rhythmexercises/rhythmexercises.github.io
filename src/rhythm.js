import {Factory, inject} from 'aurelia-framework';
import DataRhythms from 'text!./rhythms.json';
import {Exercise} from 'exercise';

@inject(Factory.of(Exercise))
export class Rhythm {
  exercises: Array<Exercise> = [];

  constructor(exerciseModel) {
    this.previous = [];

    this.index = 0;
    this.french = '';
    this.count = '';
    this.names = [];
    this.notes = [];

    this.exercises = [];

    this._exerciseModel = exerciseModel;
  }

  getExercises() {
    var res = [];
    var cnt = 1;
    var index = this.index;
    console.log('getExercises', index);

    var intToBinArray = function intToBinArray(num, last) {
      var bin = (num >>> 0).toString(2);
      if (last !== undefined) bin += last.toString();
      while (bin.length < 4) {
        bin = '0' + bin;
      }

      // Replace `1 with our current `index`.
      return Array.from(bin).map(function(n) {
        return Number(n);
      });
    };

    var addExercise = function addExercise(exercise) {
      if (!exercise || exercise.length === 0) return;

    	res.push(exercise);
    	console.log('exercise', cnt, JSON.stringify(exercise));
    	cnt++;
    }

    // Generate base set of bars.
    var level0 = [];
    // 4th beat Crotchet and Rest.
    // FIXME: Add last beat after generating combinations.
    for (var i=1; i>=0; i--) {
    	// Count to `111` in binary, zero-pad and append `i`.
    	for (var j=0; j<8; j++) {
        // Replace `1 with our current `index`.
        var bar = intToBinArray(j, i).map(function(n, k) {
          // Crotchets on the end always.
          if (index > 1 && k < 3) {
            return (Number(n) === 1) ? index : Number(1);
          } else {
            return Number(n);
          }

        });

        level0.push(bar);
      }
    }

    // Skip first and all full bars. Only do crotchets in 4th beat.
    var filterByIndex = function filterByIndex(n) {
      return (n.lastIndexOf(index) < 3 && n.indexOf(index) !== -1 && (n.indexOf(0) !== -1 || n.indexOf(1) !== -1));
    };

    level0 = level0.filter(filterByIndex);

    console.log('level0', JSON.stringify(level0));

    addExercise(level0);

    var genExercises = function genExercises(curr, next) {
      var out = [];

      // FIXME: Simplier conditions if adding 4th beat afterwards.
      var curr_mask = parseInt(curr.map(function (n, k) { return (n === index && k !== 3) ? 1 : 0; }).join(''), 2);
      var next_mask = parseInt(next.map(function (n, k) { return (n === index && k !== 3) ? 1 : 0; }).join(''), 2);

      // Find different bit set in next.
      var idx = intToBinArray((curr_mask | next_mask));
      for (var k=0; k<idx.length; k++) {
        if (curr[k] === index && idx[k] === 1) {
          idx[k] = 0;
        }
      }

      if (idx.indexOf(1) === -1) return;

      // FIXME: How to handle durations longer than 1/4?
      for (var k=0; k<index; k++) {
        var item = JSON.parse(JSON.stringify(curr));
        item[idx.indexOf(1)] = k;
        out.push(item);
      }

      return out;
    };

    var genLevel = function genLevel(level, depth) {
    	if (!level || depth <= 0) return;
      depth--;

    	for (var i=0; i<level.length; i++) {
     		var next = (i+1 >= level.length) ? level[0] : level[i+1];
      	if (next.indexOf(index) === -1) continue;
        if (level[i].lastIndexOf(0) === 3) continue;

        var exercise = genExercises(level[i], next);

        // Add matching patterns with different 4th beat.
        if (exercise && level[i+(level.length/2)]) {
          Array.prototype.push.apply(exercise, genExercises(level[i+(level.length/2)], next));
        }

        // Skip if only contains original.
        if (exercise && exercise.length < 2) continue;
        addExercise(exercise);

        // Recurse and generate exercises from each.
        genLevel(exercise, depth);
      }
    };

    genLevel(level0, 2);

    return res;
  }

  activate(input) {
    if (!input) return;

    var index = Number(input.index) || 1;
    var items = JSON.parse(DataRhythms);
    var item = items[index];
    if (!item) return;

    // Previous, including current.
    // We only show rhythms which were learnt in previous pages.
    this.previous = items.slice(0, index+1);

    this.index = index;
    this.french = item.french;
    this.count = item.count;
    this.names = item.names;
    this.notes = item.notes;

    var model = this._exerciseModel;
    this.exercises = this.getExercises().map(function (exercise) {
      return model(exercise);
    });

  }

}
