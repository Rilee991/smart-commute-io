import React, { useState } from 'react';
import * as d3 from 'd3';

// Tooltip Component
const Tooltip = ({ data, position }) => (
  <div
    style={{
      position: 'absolute',
      top: position.y,
      left: position.x,
      backgroundColor: 'white',
      border: '1px solid #ccc',
      padding: '5px',
      borderRadius: '3px',
      pointerEvents: 'none',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    }}
  >
    {data.map((d, i) => (
      <div key={i}>
        <strong>{d.name}</strong>: {d.value}
      </div>
    ))}
  </div>
);

// BarGraph Component
const BarGraph = ({ data, width = 600, height = 400, colors = ['#1f77b4', '#ff7f0e'] }) => {
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [hoveredGroup, setHoveredGroup] = useState(null);

  const margin = { top: 20, right: 30, bottom: 50, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // X and Y scales
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.label))
    .range([0, innerWidth])
    .padding(0.1);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d3.max(d.values, v => v.value))])
    .nice()
    .range([innerHeight, 0]);

  // X and Y Axis
  const xAxis = d3.axisBottom(xScale).tickFormat(d => d);
  const yAxis = d3.axisLeft(yScale).ticks(5);

  // Tooltip Handlers
  const showTooltip = (values, event, index) => {
    setTooltipData(values);
    setTooltipPos({ x: event.clientX, y: event.clientY });
    setHoveredGroup(index);
  };

  const hideTooltip = () => {
    setTooltipData(null);
    setHoveredGroup(null);
  };

  // Render bars
  const bars = data.map((d, i) => (
    <g
      key={i}
      transform={`translate(${xScale(d.label)}, 0)`}
      onMouseMove={(e) => showTooltip(d.values, e, i)}
      onMouseLeave={hideTooltip}
    >
      {d.values.map((v, j) => (
        <rect
          key={j}
          x={j * (xScale.bandwidth() / d.values.length)}
          y={yScale(v.value)}
          width={xScale.bandwidth() / d.values.length}
          height={innerHeight - yScale(v.value)}
          fill={hoveredGroup === i ? d3.color(colors[j]).brighter(1.2) : colors[j]} // Highlight group on hover
        />
      ))}
    </g>
  ));

  return (
    <div style={{ position: 'relative', width: `${width}px`, height: `${height}px` }}>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
			<path x="5" y="5.5" width="83.16666666666667" height="217" radius="0" stroke="none" pointer-events="none" fill="#ccc" class="recharts-rectangle recharts-tooltip-cursor" d="M 5,5.5 h 83.16666666666667 v 217 h -83.16666666666667 Z"></path>
          {bars}
          <g ref={node => d3.select(node).call(xAxis)} transform={`translate(0, ${innerHeight})`} />
          <g ref={node => d3.select(node).call(yAxis)} />
        </g>
      </svg>
      {tooltipData && <Tooltip data={tooltipData} position={tooltipPos} />}
    </div>
  );
};

export default BarGraph;
