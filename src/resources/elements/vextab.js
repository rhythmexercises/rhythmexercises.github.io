import {bindingMode, observable} from 'aurelia-binding';
import {bindable} from 'aurelia-templating';
import {inject} from 'aurelia-dependency-injection';
import {DOM} from 'aurelia-pal';
import {VexTab, Artist, Flow} from 'vextab';

let nextID = 0;

@inject(Element, VexTab, Artist, Flow)
export class Vextab {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) markup;
  id = nextID++;
  expanded = false;
  //@observable inputValue = '';

  constructor(element, vexTab, vexArtist, vexFlow) {
    console.log('Vextab', element);
    this.element = element;

    //this._vexTab = vexTab;
    //this._vexArtist = vexArtist;
    //this._vexFlow = vexFlow;

    this._vexRenderer = new vexFlow.Renderer(this.element, vexFlow.Renderer.Backends.SVG);
    this._vexArtist = vexArtist;
    this._vexArtist.x = 10;
    this._vexArtist.y = 10;
    this._vexArtist.last_y = 10;
    this._vexArtist.width = 600;
    this._vexArtist.customizations.width = 600;
    this._vexTab = vexTab;
    this._vexTab.artist = this._vexArtist;
  }

  markupChanged() {
    console.log('markupChanged', this.element, this.markup);
    //this.element.innerHTML = this.markup;
    //console.log(document.getElementById('au-vextab-0'));

    //var renderer = new this._vexFlow.Renderer('#au-vextab-'+this.id, this._vexFlow.Renderer.Backends.CANVAS);


    //try {
      // Parse VexTab music notation passed in as a string.
      this._vexTab.parse(this.markup);
      //vextab.parse("tabstave notation=true\n notes :q 4/4\n");

      // Render notation onto canvas.
      this._vexArtist.render(this._vexRenderer);
    //} catch (e) {
    //  console.log(e);
    //}
  }

}
