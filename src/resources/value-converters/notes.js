// tabstave clef=percussion notation=true tablature=false
// notes $$$

//import numbro from 'numbro';
import DataRhythms from 'text!../../rhythms.json';

export class NotesValueConverter {
  constructor() {
    this.rhythms = JSON.parse(DataRhythms);
  }

  toView(notes, index = 0) {
    var res = '';
    for (var i = 0; i < notes.length; i++) {
      if (res) res += ' ';

      // TODO: Handle multiple notes definitions. When to switch?
      res += this.rhythms[notes[i]].notes[index];
    }

    return res;
  }
}
