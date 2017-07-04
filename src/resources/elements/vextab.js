import {bindingMode, observable} from 'aurelia-binding';
import {bindable} from 'aurelia-templating';
import {inject} from 'aurelia-dependency-injection';
import {DOM} from 'aurelia-pal';
import {VexTab, Artist, Flow} from 'vextab';

let nextID = 0;

@inject(Element, VexTab, Artist, Flow)
export class Vextab {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) markup;
  @bindable width = 400;
  id = nextID++;

  constructor(element, vexTab, vexArtist, vexFlow) {
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

  attached() {
    this._vexRenderer = new this._vexFlow.Renderer(this.element.childNodes[0], this._vexFlow.Renderer.Backends.SVG);
    this._vexArtist.width = this.width;
    this._vexArtist.customizations.width = this.width;
    this.parseMarkup(this.markup);
  }

  markupChanged() {
    this.parseMarkup(this.markup);
  }

  parseMarkup(markup) {
    if (!markup || !this._vexRenderer) return;

    markup = 'tabstave clef=none notation=true tablature=false\nnotes ' + markup;

    // Reset Artist state as we're using the same instance.
    this._vexArtist.last_y = 10;
    this._vexArtist.staves = [];
    this._vexArtist.stave_articulations = [];
    this._vexArtist.tab_articulations = [];

    try {
      // Parse VexTab music notation passed in as a string.
      this._vexTab.parse(markup);

      // Render notation onto canvas.
      this._vexArtist.render(this._vexRenderer);
    } catch (e) {
      console.log(e);
    }
  }

}
