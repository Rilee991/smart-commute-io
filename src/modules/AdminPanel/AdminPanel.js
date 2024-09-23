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

export default function AdminPanel({ employees = [] }) {
    const [activeTab, setActiveTab] = useState('traffic');
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [showTrafficChart, setShowTrafficChart] = useState(true);
    const [showEveningTrafficChart, setShowEveningTrafficChart] = useState(true);
    const [showEmployeeChart, setShowEmployeeChart] = useState(true);
    const [deptEmpCount, setDeptEmpCount] = useState([]);

    useEffect(() => {
      const deptEmpsCount = groupByDepartmentAndCompany(employees);

      setDeptEmpCount(deptEmpsCount);
    }, [employees.length]);
  
    const employeeData = [
      { name: 'Company A', IT: 65, HR: 28, Finance: 45 },
      { name: 'Company B', IT: 59, HR: 48, Finance: 30 },
      { name: 'Company C', IT: 80, HR: 40, Finance: 50 },
      { name: 'Company D', IT: 81, HR: 19, Finance: 60 },
      { name: 'Company E', IT: 56, HR: 86, Finance: 70 },
    ]
  
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
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Morning Traffic for Next 7 Days</CardTitle>
                  <Button onClick={() => setShowTrafficChart(!showTrafficChart)}>
                    {showTrafficChart ? <TableIcon className="mr-2" /> : <ChartLineIcon className="mr-2" /> }
                    {showTrafficChart ? 'Show Table View' : 'Show Chart View'}
                  </Button>
              </CardHeader>
              <CardContent>
                {showTrafficChart ? (
                  <LineChart data={trafficPrediction.morning} xAxisKey="date" lines={Object.keys(trafficPrediction.morning[0]).filter(item => item !== 'name')} />
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        {Object.keys(trafficPrediction.morning[0]).filter(item => item !== 'name').map(item => (
                          <TableHead key={item}>{item}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trafficPrediction.morning.map((pred) => (
                        <TableRow key={pred.name}>
                          <TableCell>{pred.name}</TableCell>
                          {Object.keys(trafficPrediction.morning[0]).filter(item => item !== 'name').map(item => (
                            <TableCell key={item}>{pred[item]}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Evening Traffic for Next 7 Days</CardTitle>
                <Button onClick={() => setShowEveningTrafficChart(!showEveningTrafficChart)}>
                  {showEveningTrafficChart ? <TableIcon className="mr-2" /> : <ChartLineIcon className="mr-2" /> }
                  {showEveningTrafficChart ? 'Show Table View' : 'Show Chart View'}
                </Button>
              </CardHeader>
              <CardContent>
                {showEveningTrafficChart ? (
                  <LineChart data={trafficPrediction.evening} xAxisKey="date" lines={Object.keys(trafficPrediction.evening[0]).filter(item => item !== 'name')} />
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        {Object.keys(trafficPrediction.evening[0]).filter(item => item !== 'name').map(item => (
                          <TableHead key={item}>{item}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trafficPrediction.evening.map((pred) => (
                        <TableRow key={pred.name}>
                          <TableCell>{pred.name}</TableCell>
                          {Object.keys(trafficPrediction.evening[0]).filter(item => item !== 'name').map(item => (
                            <TableCell key={item}>{pred[item]}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
  
          <TabsContent value="employees">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Department-wise Employee Count</CardTitle>
                <Button onClick={() => setShowEmployeeChart(!showEmployeeChart)}>
                  {showEmployeeChart ? <TableIcon className="mr-2" /> : <ChartBarIcon className="mr-2" />}
                  {showEmployeeChart ? 'Show Table' : 'Show Chart'}
                </Button>
              </CardHeader>
              <CardContent>
                {showEmployeeChart ? (
                  <BarChart data={deptEmpCount} bars={Object.keys(deptEmpCount[0] || {}).filter(item => item !== 'department')} xAxisKey="department" />
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {Object.keys(deptEmpCount[0]).map(row => (
                            <TableHead key={row}>{startCase(row)}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {deptEmpCount && deptEmpCount.map((item) => (
                        <TableRow key={item.department}>
                          {Object.keys(deptEmpCount[0]).map(row => (
                            <TableCell>{item[row]}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
  
          <TabsContent value="schedule">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Employee Schedules</CardTitle>
                <Button onClick={() => setShowScheduleModal(true)}>Create Schedule</Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Time Slot</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Company A</TableCell>
                      <TableCell>John Doe</TableCell>
                      <TableCell>IT</TableCell>
                      <TableCell>9:00 AM - 10:00 AM</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Company B</TableCell>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>HR</TableCell>
                      <TableCell>10:00 AM - 11:00 AM</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Company C</TableCell>
                      <TableCell>Bob Johnson</TableCell>
                      <TableCell>Finance</TableCell>
                      <TableCell>8:00 AM - 9:00 AM</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
  
          <TabsContent value="penalties">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Company A Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={75} className="w-full" />
                  <p className="mt-2 text-sm text-gray-600">75% of employees followed the schedule</p>
                  <p className="text-sm text-gray-600">25 employees complied, 8 did not</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Company B Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={90} className="w-full" />
                  <p className="mt-2 text-sm text-gray-600">90% of employees followed the schedule</p>
                  <p className="text-sm text-gray-600">45 employees complied, 5 did not</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Company C Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={60} className="w-full" />
                  <p className="mt-2 text-sm text-gray-600">60% of employees followed the schedule</p>
                  <p className="text-sm text-gray-600">30 employees complied, 20 did not</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Company D Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={85} className="w-full" />
                  <p className="mt-2 text-sm text-gray-600">85% of employees followed the schedule</p>
                  <p className="text-sm text-gray-600">34 employees complied, 6 did not</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
  
        <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Schedule</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-center text-gray-600">Scheduling algorithm is running...</p>
              <div className="mt-4 flex justify-center">
                <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setShowScheduleModal(false)}>Close</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
}