import {
  axisBottom, axisLeft, max, scaleBand, scaleLinear, select,
} from 'd3';

/**
 * @param { object } $el - elemento del DOM dentro del cual se construirá la dona
 * @param { object } options - opciones para manipular la dona
 * @param { string } options.activeProp - propiedad para barras activas
 * @param {string} options.classActive - clase para secciones de la dona activas
 * @param {string} options.classUnActive - clase para secciones de la dona inactivas
 * @param { array } options.data - data a representar en la dona
 * @param { boolean } options.flagActiveXScale - mostrar o no escala X
 * @param { boolean } options.flagActiveYScale - mostrar o no escala Y
 * @param { number | string } options.height - altura barras
 * @param { object } options.margin - espacio libre interno
 * @param { number } options.margin.top - espacio libre interno superior
 * @param { number } options.margin.right - espacio libre interno derecho
 * @param { number } options.margin.bottom - espacio libre interno inferior
 * @param { number } options.margin.left - espacio libre interno izquierdo
 * @param { string } options.viewBox - valor del viewBox del svg
 * @param { number } options.widthBarFactor - número divisor de bandWidth
 * @param { string } options.xProp - propiedad a mostrar en eje x
 * @param { string } options.yProp - propiedad a mostrar en eje y
 * @param { number } options.yTicks - cantidad de divisiones del eje y
 */
class Bars {
  constructor($el, options) {
    const defaultMaring = {
      top: 20, right: 20, bottom: 20, left: 20,
    };
    const {
      activeProp,
      classActive,
      classUnActive,
      data,
      flagActiveXScale,
      flagActiveYScale,
      height,
      margin,
      viewBox,
      width,
      widthBarFactor,
      xProp,
      yProp,
      yTicks,
    } = options;
    const svgWidth = 100;
    const svgHeight = 100;
    this.activeProp = activeProp;
    this.classActive = classActive;
    this.classUnActive = classUnActive;
    this.el = $el;
    this.data = data;
    this.flagActiveXScale = flagActiveXScale === null ? true : flagActiveXScale;
    this.flagActiveYScale = flagActiveYScale === null ? true : flagActiveYScale;
    this.height = height || svgHeight;
    this.margin = margin || defaultMaring;
    this.width = width || svgWidth;
    this.widthBarFactor = widthBarFactor || 10000;
    this.x = null;
    this.xProp = xProp;
    this.y = null;
    this.yProp = yProp;
    this.yticks = yTicks || 10;

    this.svg = select(this.el).append('svg')
      .attr('width', width || `${svgWidth}%`)
      .attr('height', height || `${svgHeight}%`)
      .attr('viewBox', viewBox || `0 0 ${width || svgWidth} ${height || svgHeight}`);
  }

  init() {
    this.createX.call(this);
    this.createY.call(this);
    if (this.flagActiveXScale) {
      this.createXScale.call(this);
    }
    if (this.flagActiveYScale) {
      this.createYScale.call(this);
    }
    this.createBars.call(this);
  }

  createBars() {
    const {
      activeProp,
      classActive,
      classUnActive,
      data,
      height,
      margin,
      widthBarFactor,
      x,
      xProp,
      y,
      yProp,
    } = this;
    this.svg.append('g').selectAll('rect')
      .data(data)
      .join('rect')
      .attr('y', (d) => y(d[yProp]))
      .attr('x', (d) => x(d[xProp]) + x.bandwidth() / widthBarFactor)
      .attr('height', (d) => (height - margin.bottom) - y(d[yProp]))
      .attr('width', x.bandwidth())
      .attr('class', (d) => (d[activeProp] ? classActive : classUnActive));
  }

  createX() {
    const {
      data, margin, width, xProp,
    } = this;
    this.x = scaleBand()
      .domain(data.map((d) => d[xProp]))
      .range([margin.left, width - margin.right]);
  }

  createXScale() {
    const {
      height, margin, svg, x,
    } = this;
    svg.append('g')
      .attr('transform', `translate(${[0, height - margin.bottom]})`)
      .call(axisBottom(x));
  }

  createY() {
    const {
      data, margin, height, yProp,
    } = this;
    this.y = scaleLinear()
      .domain([0, max(data, (d) => d[yProp])])
      .range([height - margin.bottom, margin.top]);
  }

  createYScale() {
    const {
      svg, margin, y, yticks,
    } = this;
    svg.append('g')
      .attr('transform', `translate(${[margin.left, 0]})`)
      .call(
        axisLeft(y).ticks(yticks),
      );
  }
}

export default Bars;
