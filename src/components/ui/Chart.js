import React from 'react'
import { LineChart as RechartsLineChart, BarChart as RechartsBarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export const LineChart = ({ data }) => (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Morning (7-11 AM)" stroke="#8884d8" strokeWidth="2" />
        <Line type="monotone" dataKey="Evening (6-10 PM)" stroke="#82ca9d" strokeWidth="2" />
      </RechartsLineChart>
    </ResponsiveContainer>
)

export const BarChart = ({ data }) => (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="IT" fill="#8884d8" />
        <Bar dataKey="HR" fill="#82ca9d" />
        <Bar dataKey="Finance" fill="#ffc658" />
      </RechartsBarChart>
    </ResponsiveContainer>
  )