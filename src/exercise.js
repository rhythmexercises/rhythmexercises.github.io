export class Exercise {

  constructor(rhythms) {
    console.log('Exercise', 'constructor', rhythms);

    this.rhythms = rhythms || [];
  }

  activate() {
    console.log('Exercise', 'activate', arguments);

    // TODO: Do construction of tree here?
  }

}
