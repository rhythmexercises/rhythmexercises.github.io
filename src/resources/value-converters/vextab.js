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
    var res = '';
    for (var i = 0; i < notes.length; i++) {
      if (res) res += ' ';

      // TODO: Handle multiple notes definitions.
      res += this.rhythms[notes[i]].notes[0];
    }

    //if (!res) return '';
    //res = type + ' clef=none notation=true tablature=false\nnotes ' + res;

    return res;
  }
}
