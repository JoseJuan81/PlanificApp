import { arc, select } from 'd3';

/**
 * @param { object } $el - elemento del DOM dentro del cual se construirá la dona
 * @param { object } options - opciones para manipular la dona
 * @param {string} options.classActive - clase para secciones de la dona activas
 * @param {string} options.classUnActive - clase para secciones de la dona inactivas
 * @param { number } options.cornerRadius - radio de las esquines de cada sección de la dona
 * @param { array } options.data - data a representar en la dona
 * @param { number } options.innerRadius - radio interno de la dona
 * @param { number } options.outerRadius - radio exterior de la dona
 * @param { number } options.padAngle - separación entre secciones de la dona (radianes)
 * @param { string } options.prop - propiedad a usar para manipular data dentro de la dona
 * @param { number } options.scaleInnerRadius - incremento r interno de sección activa de la dona
 * @param { number } options.scaleOuterRadius - incremento r externo de sección activa de la dona
 */
class Donut {
  constructor($el, options) {
    const {
      classActive,
      classUnActive,
      cornerRadius,
      data,
      innerRadius,
      outerRadius,
      padAngle,
      prop,
      scaleInnerRadius,
      scaleOuterRadius,
    } = options;
    this.arc = arc;
    this.classActive = classActive;
    this.classUnActive = classUnActive;
    this.cornerRadius = cornerRadius || 0;
    this.data = data.sort((a, b) => a[prop] - b[prop]);
    this.el = $el;
    this.innerRadius = innerRadius || 4;
    this.outerRadius = outerRadius || 15;
    this.padAngle = padAngle || (Math.PI / 60);
    this.prop = prop;
    this.scaleInnerRadius = scaleInnerRadius || 0;
    this.scaleOuterRadius = scaleOuterRadius || 0;
    this.svg = null;
  }

  init(width = 200, height = 200, viewBox = '-2.5 -21.5 5 45') {
    this.svg = select(this.el).append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', viewBox);
    this.createDonut();
  }

  createDonut() {
    this.svg.append('g')
      .selectAll('path')
      .data(this.data)
      .enter()
      .append('path')
      .attr('class', (d) => (d[this.prop] ? this.classActive : this.classUnActive))
      .attr('d', this.getArc.call(this));
  }

  getArc() {
    const len = this.data.length;
    const innerScale = this.scaleInnerRadius;
    const outerScale = this.scaleOuterRadius;
    return this.arc()
      .innerRadius((d) => this.innerRadius * `1.${d[this.prop] ? innerScale : 0}`)
      .outerRadius((d) => this.outerRadius * `1.${d[this.prop] ? outerScale : 0}`)
      .startAngle((d, i) => (i * 2 * Math.PI) / len)
      .endAngle((d, i) => ((2 * Math.PI) / len) * (i + 1))
      .cornerRadius(this.cornerRadius)
      .padAngle(this.padAngle);
  }
}
export default Donut;
