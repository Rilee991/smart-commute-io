import React from 'react'
import { LineChart as RechartsLineChart, BarChart as RechartsBarChart, Label, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LabelList } from 'recharts'
import ColorPicker from '../data/ColorPicker';
import { darkColors } from '../data/data';

export const LineChart = ({ data, lines = [], xAxisKey = "", xAxisLabel = "", yAxisLabel = "" }) => {
  const colorPicker = new ColorPicker(darkColors);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey}>
          <Label value={xAxisLabel} offset={-10} position="bottom" />
        </XAxis>
        <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}  />
        <Tooltip />
        <Legend verticalAlign="top" />
        {lines && lines.map(line => (
          <Line key={line} type="monotone" dataKey={line} stroke={colorPicker.getNextColor()} strokeWidth="3">
          </Line>
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

export const BarChart = ({ data, xAxisKey = "name", bars = [] }) =>  {
  const colorPicker = new ColorPicker(darkColors);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {bars && bars.map(bar => (
          <Bar key={bar} dataKey={bar} fill={colorPicker.getNextColor()} />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}