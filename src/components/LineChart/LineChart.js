import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { min, max } from 'd3-array'
import { line, curveLinear } from 'd3-shape'
import { select as d3Select } from 'd3-selection'
import { axisBottom, axisLeft } from 'd3-axis'
import { scaleTime, scaleLinear } from 'd3-scale'
import { TweenLite, TimelineLite } from 'gsap'
import 'gsap/CSSPlugin'

import './lineChart.scss'

const LineChart = class LineChart extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidUpdate (prevProps, prevState) {
    d3Select('svg').remove()
    var tl = new TimelineLite()
    tl.add(TweenLite.to('.line', 1, { stroke: '#007bff', delay: 0.5 }))
    tl.add(TweenLite.to('.dot', 0.5, { fill: '#074f9c' }))
  }

  render () {
    const { data } = this.props

    if (data.length > 0) {
      var margin = { top: 50, right: 50, bottom: 50, left: 50 }
      var width = 840 - margin.left - margin.right
      var height = 300 - margin.top - margin.bottom
      const x = scaleTime().range([0, width])
      const y = scaleLinear().range([height, 0])
      const xAxis = axisBottom().scale(x)
      const yAxis = axisLeft().scale(y)
      const labels = data.map(d => d[0])

      x.domain([new Date(min(labels)), new Date(max(labels))])
      y.domain([0, max(data, d => d[1])])

      var xScale = scaleTime()
        .domain([new Date(min(labels)), new Date(max(labels))])
        .range([0, width]) // output

      var yScale = scaleLinear()
        .domain([0, max(data, d => d[1])])
        .range([height, 0])

      var lines = line()
        .x(d => {
          return xScale(new Date(d[0]))
        })
        .y(d => {
          return yScale(d[1])
        })
        .curve(curveLinear)

      var svg = d3Select(this.svgRoot)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      svg
        .append('g')
        .attr('class', 'x-axis')
        .attr('transform', 'translate(0, ' + height + ')')
        .style('text-anchor', 'start')
        .call(xAxis)
        .selectAll('text')
        .attr('y', 0)
        .attr('x', 9)
        .attr('dy', '.35em')
        .attr('transform', 'rotate(75)')
        .style('text-anchor', 'start')

      svg
        .append('g')
        .attr('class', 'y-axis')
        .call(yAxis)

      svg
        .append('text')
        .attr('class', 'axis-label')
        .attr('transform', 'rotate(-90)')
        .attr('x', '-4em')
        .attr('dy', '-2em')
        .style('text-anchor', 'end')
        .text('Commits')

      svg
        .append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', lines)
        .attr('fill', 'none')
        .attr('stroke', '#efefef')
        .attr('stroke-width', 2)

      svg
        .selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('fill', '#007bff')
        .attr('class', 'dot')
        .attr('cx', (d, i) => {
          return xScale(new Date(d[0]))
        })
        .attr('cy', d => {
          return yScale(d[1])
        })
        .attr('r', 3)
    }

    return (
      <div
        ref={el => {
          this.svgRoot = el
        }}
      >
        <svg />
      </div>
    )
  }
}

LineChart.propTypes = {
  data: PropTypes.array.isRequired
}

export default LineChart
