define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.title = 'Rhythm Exercises';
      config.map([{
        route: [':index'],
        name: 'rhythm',
        moduleId: 'rhythm'
      }]);

      config.fallbackRoute('1');
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('exercise',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Exercise = exports.Exercise = function Exercise(rhythms) {
    _classCallCheck(this, Exercise);

    this.rhythms = rhythms || [];
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('rhythm',['exports', 'aurelia-framework', 'text!./rhythms.json', 'exercise'], function (exports, _aureliaFramework, _rhythms, _exercise) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Rhythm = undefined;

  var _rhythms2 = _interopRequireDefault(_rhythms);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _dec3, _class, _desc, _value, _class2;

  var Rhythm = exports.Rhythm = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.Factory.of(_exercise.Exercise)), _dec2 = (0, _aureliaFramework.computedFrom)('index'), _dec3 = (0, _aureliaFramework.computedFrom)('index'), _dec(_class = (_class2 = function () {
    function Rhythm(exerciseModel) {
      _classCallCheck(this, Rhythm);

      this.exercises = [];

      this.rhythms = [];
      this.previous = [];

      this.index = 0;
      this.french = '';
      this.count = '';
      this.names = [];
      this.notes = [];

      this.exercises = [];

      this._exerciseModel = exerciseModel;
    }

    Rhythm.prototype.getExercises = function getExercises() {
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

        return Array.from(bin).map(function (n) {
          return Number(n);
        });
      };

      var addExercise = function addExercise(exercise) {
        if (!exercise || exercise.length === 0) return;

        res.push(exercise);
        console.log('exercise', cnt, JSON.stringify(exercise));
        cnt++;
      };

      var level0 = [];

      for (var i = 1; i >= 0; i--) {
        for (var j = 0; j < 8; j++) {
          var bar = intToBinArray(j, i).map(function (n, k) {
            if (index > 1 && k < 3) {
              return Number(n) === 1 ? index : Number(1);
            } else {
              return Number(n);
            }
          });

          level0.push(bar);
        }
      }

      var filterByIndex = function filterByIndex(n) {
        return n.lastIndexOf(index) < 3 && n.indexOf(index) !== -1 && (n.indexOf(0) !== -1 || n.indexOf(1) !== -1);
      };

      level0 = level0.filter(filterByIndex);

      console.log('level0', JSON.stringify(level0));

      addExercise(level0);

      var genExercises = function genExercises(curr, next) {
        var out = [];

        var curr_mask = parseInt(curr.map(function (n, k) {
          return n === index && k !== 3 ? 1 : 0;
        }).join(''), 2);
        var next_mask = parseInt(next.map(function (n, k) {
          return n === index && k !== 3 ? 1 : 0;
        }).join(''), 2);

        var idx = intToBinArray(curr_mask | next_mask);
        for (var k = 0; k < idx.length; k++) {
          if (curr[k] === index && idx[k] === 1) {
            idx[k] = 0;
          }
        }

        if (idx.indexOf(1) === -1) return;

        for (var k = 0; k < index; k++) {
          var item = JSON.parse(JSON.stringify(curr));
          item[idx.indexOf(1)] = k;
          out.push(item);
        }

        return out;
      };

      var genLevel = function genLevel(level, depth) {
        if (!level || depth <= 0) return;
        depth--;

        for (var i = 0; i < level.length; i++) {
          var next = i + 1 >= level.length ? level[0] : level[i + 1];
          if (next.indexOf(index) === -1) continue;
          if (level[i].lastIndexOf(0) === 3) continue;

          var exercise = genExercises(level[i], next);

          if (exercise && level[i + level.length / 2]) {
            Array.prototype.push.apply(exercise, genExercises(level[i + level.length / 2], next));
          }

          if (exercise && exercise.length < 2) continue;
          addExercise(exercise);

          genLevel(exercise, depth);
        }
      };

      genLevel(level0, 2);

      return res;
    };

    Rhythm.prototype.activate = function activate(input) {
      if (!input) return;

      var index = Number(input.index) || 1;
      this.rhythms = JSON.parse(_rhythms2.default);
      var item = this.rhythms[index];
      if (!item) return;

      this.previous = this.rhythms.slice(0, index + 1);

      this.index = index;
      this.french = item.french;
      this.count = item.count;
      this.names = item.names;
      this.notes = item.notes;

      var model = this._exerciseModel;
      this.exercises = this.getExercises().map(function (exercise) {
        return model(exercise);
      });
    };

    _createClass(Rhythm, [{
      key: 'hasPrev',
      get: function get() {
        return this.index > 1;
      }
    }, {
      key: 'hasNext',
      get: function get() {
        return this.rhythms && this.index < this.rhythms.length - 1;
      }
    }]);

    return Rhythm;
  }(), (_applyDecoratedDescriptor(_class2.prototype, 'hasPrev', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'hasPrev'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'hasNext', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'hasNext'), _class2.prototype)), _class2)) || _class);
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['./elements/vextab', './value-converters/notes']);
  }
});
define('resources/elements/vextab',['exports', 'aurelia-binding', 'aurelia-templating', 'aurelia-dependency-injection', 'aurelia-pal', 'vextab'], function (exports, _aureliaBinding, _aureliaTemplating, _aureliaDependencyInjection, _aureliaPal, _vextab) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Vextab = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

  var nextID = 0;

  var Vextab = exports.Vextab = (_dec = (0, _aureliaDependencyInjection.inject)(Element, _vextab.VexTab, _vextab.Artist, _vextab.Flow), _dec2 = (0, _aureliaTemplating.bindable)({ defaultBindingMode: _aureliaBinding.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
    function Vextab(element, vexTab, vexArtist, vexFlow) {
      _classCallCheck(this, Vextab);

      _initDefineProp(this, 'markup', _descriptor, this);

      _initDefineProp(this, 'width', _descriptor2, this);

      this.id = nextID++;

      this.element = element;

      this._vexRenderer;
      this._vexTab = vexTab;
      this._vexFlow = vexFlow;
      this._vexArtist = vexArtist;
      this._vexArtist.x = 10;
      this._vexArtist.y = 10;
      this._vexArtist.last_y = 10;
      this._vexTab.artist = this._vexArtist;
    }

    Vextab.prototype.attached = function attached() {
      this._vexRenderer = new this._vexFlow.Renderer(this.element.childNodes[0], this._vexFlow.Renderer.Backends.SVG);
      this._vexArtist.width = this.width;
      this._vexArtist.customizations.width = this.width;
      this.parseMarkup(this.markup);
    };

    Vextab.prototype.markupChanged = function markupChanged() {
      this.parseMarkup(this.markup);
    };

    Vextab.prototype.parseMarkup = function parseMarkup(markup) {
      if (!markup || !this._vexRenderer) return;

      markup = 'tabstave clef=none notation=true tablature=false\nnotes ' + markup;

      this._vexArtist.last_y = 10;
      this._vexArtist.staves = [];
      this._vexArtist.stave_articulations = [];
      this._vexArtist.tab_articulations = [];

      try {
        this._vexTab.parse(markup);

        this._vexArtist.render(this._vexRenderer);
      } catch (e) {
        console.log(e);
      }
    };

    return Vextab;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'markup', [_dec2], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'width', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return 400;
    }
  })), _class2)) || _class);
});
define('resources/value-converters/notes',['exports', 'text!../../rhythms.json'], function (exports, _rhythms) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NotesValueConverter = undefined;

  var _rhythms2 = _interopRequireDefault(_rhythms);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var NotesValueConverter = exports.NotesValueConverter = function () {
    function NotesValueConverter() {
      _classCallCheck(this, NotesValueConverter);

      this.rhythms = JSON.parse(_rhythms2.default);
    }

    NotesValueConverter.prototype.toView = function toView(notes) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var res = '';
      for (var i = 0; i < notes.length; i++) {
        if (res) res += ' ';

        res += this.rhythms[notes[i]].notes[index];
      }

      return res;
    };

    return NotesValueConverter;
  }();
});
define('text!rhythms.json',[],function () { return '[\n  {\n    "french": "taa",\n    "names": [\n      "crotchet",\n      "quarter note"\n    ],\n    "count": "1 beat",\n    "notes": [":4 E/4"]\n  },\n  {\n    "french": "rest",\n    "names": [\n      "crotchet rest",\n      "quarter note rest"\n    ],\n    "count": "1 beat",\n    "notes": [":4 ##"]\n  },\n  {\n    "french": "tafa-fe",\n    "names": [\n      "semiquaver quaver semiquaver",\n      "sixteenth note, eigth note, sixteenth note"\n    ],\n    "count": "1/4 beat + 1/2 beat + 1/4 beat",\n    "notes": [\n      ":16 E/4 :8 E/4 :16 E/4",\n      ":16 E-EbE-E/4"\n    ]\n  },\n  {\n    "french": "ta - te",\n    "names": [\n      "dotted - quaver - semiquaver",\n      "dotted eigth note and sixteenth note"\n    ],\n    "count": "3/4 beat + 1/4 beat",\n    "notes": [":8d E/4 :16 E/4"]\n  }\n]\n';});

define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"./style/main.css\"></require><a href=\"https://github.com/rhythmexercises/rhythmexercises.github.io\"><img style=\"position:absolute;top:0;right:0;border:0\" src=\"https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67\" alt=\"Fork me on GitHub\" data-canonical-src=\"https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png\"></a><router-view class=\"${router.isNavigating ? 'navigating' : ''}\"></router-view></template>"; });
define('text!exercise.html', ['module'], function(module) { module.exports = "<template><div><h3>Exercise ${$index+1}</h3><ul><li repeat.for=\"rhythm of rhythms\"><vextab width=\"200\" markup.bind=\"rhythm | notes\"></vextab></li></ul></div></template>"; });
define('text!style/main.css', ['module'], function(module) { module.exports = "header a {\n  font-size: 1.2em;\n  font-weight: bold; }\n\n.container {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center; }\n  .container > div {\n    flex: 0 1 auto;\n    padding: 0 1em; }\n    .container > div .grow {\n      flex-grow: 1;\n      flex-shrink: 0; }\n    .container > div .shrink {\n      flex-grow: 0;\n      flex-shrink: 1; }\n  .container ul {\n    list-style-type: none;\n    padding-left: 0; }\n\nsvg text {\n  display: none; }\n"; });
define('text!rhythm.html', ['module'], function(module) { module.exports = "<template><header class=\"container\"><div class=\"shrink\" show.bind=\"hasPrev\"><a href=\"#/${index-1}\">Prev</a></div><div class=\"grow\"><h1>Rhythm Exercises</h1><dl><dt>Rhythm</dt><dd><vextab width=\"200\" markup.bind=\"notes[0]\"></vextab></dd><dt>French</dt><dd><code>${french}</code></dd><dt>Other</dt><dd><ul repeat.for=\"name of names\"><li>${name}</li></ul></dd><dt>Count</dt><dd>${count}</dd></dl></div><div class=\"shrink\" show.bind=\"hasNext\"><a href=\"#/${index+1}\">Next</a></div></header><div class=\"container\"><template repeat.for=\"exercise of exercises\"><compose view-model.bind=\"exercise\" containerless></compose></template></div></template>"; });
define('text!resources/elements/vextab.html', ['module'], function(module) { module.exports = "<template><div id.one-time=\"'au-vextab-' + id\"></div></template>"; });
//# sourceMappingURL=app-bundle.js.map