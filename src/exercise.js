export class Exercise {

  constructor(item, items) {
    console.log('Exercise', 'constructor', item, items);

    this.rhythm = item || {};
    this.rhythms = items || [];
  }

  activate() {
    console.log('Exercise', 'activate', arguments);
    // TODO: Do construction of tree here?
  }

}
