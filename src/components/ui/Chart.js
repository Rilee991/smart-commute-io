import React from 'react'
import { LineChart as RechartsLineChart, BarChart as RechartsBarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import ColorPicker from '../data/ColorPicker';
import { darkColors } from '../data/data';

export const LineChart = ({ data, lines = [], xAxisKey = "" }) => {
  const colorPicker = new ColorPicker(darkColors);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {lines && lines.map(line => (
          <Line key={line} type="monotone" dataKey={line} stroke={colorPicker.getNextColor()} strokeWidth="3" />
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
        {/* <Bar dataKey="IT" fill="#8884d8" />
        <Bar dataKey="HR" fill="#82ca9d" />
        <Bar dataKey="Finance" fill="#ffc658" /> */}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}