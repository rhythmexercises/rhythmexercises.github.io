// tabstave clef=percussion notation=true tablature=false
// notes $$$

//import numbro from 'numbro';
import DataRhythms from 'text!../../rhythms.json';

export class VexflowValueConverter {
  constructor() {
    this.rhythms = JSON.parse(DataRhythms);
  }

  toView(notes, type = 'tabstave') {
    //console.log('Vexflow', notes, type);
    var res = type + ' clef=percussion notation=true tablature=false\nnotes ';
    for (var i = 0; i < notes.length; i++) {
      if (res) res += ' ';
      res += this.rhythms[notes[i]].notes;
    }

    return res;
  }
}
