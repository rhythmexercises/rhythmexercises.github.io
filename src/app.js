export class App {

  /*
  constructor() {
    // Example VexTab output:
    // tabstave clef=percussion notation=true tablature=false
    // notes :16 E/4 :8d E/4 :8 ##-E-E/4 ^3^ :16 E-E-E-E/4 :4 ##
  }
  */

  configureRouter(config, router) {
    this.router = router;
    config.title = 'Rhythm Exercises';
    config.map([
      {
        route: [':index'],
        name: 'rhythm',
        moduleId: 'rhythm',
      },
    ]);

    config.fallbackRoute('1');
  }

}
