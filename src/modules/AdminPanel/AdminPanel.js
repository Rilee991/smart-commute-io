import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Cards"
import { Button } from "../../components/ui/Button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/Tabs"
import { LineChart, BarChart } from '../../components/ui/Chart'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/Dialog"
import { Progress } from "../../components/ui/Progress"
import { ArrowRightIcon, BarChartIcon, CalendarIcon, AlertTriangleIcon, TableIcon, ChartLineIcon, ChartBarIcon } from 'lucide-react'
import { trafficPrediction } from '../../components/data/data'
import { groupByDepartmentAndCompany } from '../../components/data/utils'
import { startCase } from 'lodash'
import TrafficData from './TrafficData/TrafficData'
import EmployeeData from './EmployeeData/EmployeeData'
import Schedule from './Schedule/Schedule'
import Penalty from './Penalty/Penalty'

export default function AdminPanel({ employees = [] }) {
    const [activeTab, setActiveTab] = useState('traffic');
  
    return (
      <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
        <header className="bg-white shadow rounded-lg mb-6 p-4">
          <h1 className="text-3xl font-bold text-gray-800">Smart Commute Admin Panel</h1>
        </header>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-white p-1 rounded-lg shadow">
            <TabsTrigger value="traffic" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BarChartIcon className="mr-2" />Traffic Data
            </TabsTrigger>
            <TabsTrigger value="employees" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ArrowRightIcon className="mr-2" />Employee Data
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <CalendarIcon className="mr-2" />Schedules
            </TabsTrigger>
            <TabsTrigger value="penalties" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <AlertTriangleIcon className="mr-2" />Penalties
            </TabsTrigger>
          </TabsList>
  
          <TabsContent value="traffic">
            <TrafficData trafficPrediction={trafficPrediction.morning} type={"Morning"} />
            <br/>
            <TrafficData trafficPrediction={trafficPrediction.evening} type={"Evening"} />
          </TabsContent>
  
          <TabsContent value="employees">
            <EmployeeData employees={employees} />
          </TabsContent>
  
          <TabsContent value="schedule">
            <Schedule employees={employees} />
          </TabsContent>
  
          <TabsContent value="penalties">
            <Penalty employees={employees} />
          </TabsContent>
        </Tabs>
      </div>
    )
}