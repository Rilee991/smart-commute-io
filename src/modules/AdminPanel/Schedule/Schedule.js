import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Cards"
import { Button } from "../../../components/ui/Button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/Tabs"
import { LineChart, BarChart } from '../../../components/ui/Chart'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/Table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/Dialog"
import { Progress } from "../../../components/ui/Progress"
import { ArrowRightIcon, BarChartIcon, CalendarIcon, AlertTriangleIcon, TableIcon, ChartLineIcon, ChartBarIcon } from 'lucide-react'
import { morningSlots, eveningSlots, shuttleCapacity, shuttleEquivalentVehicles, trafficPrediction } from '../../../components/data/data'
import { assignSlotsWithoutPreference, createEmployeeTable, groupByDepartmentAndCompany } from '../../../components/data/utils'
import { isEmpty, startCase } from 'lodash';
import SlotWiseDist from './SlotWiseDist'
import EmployeeTableSlots from './CompanyWiseEmpSlots'

const ScheduleDialog = ({ onClose, onSubmit }) => {
    const [preferenceType, setPreferenceType] = useState('no-preference');
    const [isGenerating, setIsGenerating] = useState(false);
  
    const handleGenerate = () => {
      setIsGenerating(true);
      // Simulating schedule generation process
        setTimeout(() => {
            onSubmit(preferenceType);
            setIsGenerating(false);
            onClose();
        }, 2000);
    };
  
    return (
      <div className="bg-white w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Create Schedule</h2>
        <div className="mb-4">
          <p className="text-gray-700 mb-2">Generate schedule based on:</p>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="preference"
                value="no-preference"
                checked={preferenceType === 'no-preference'}
                onChange={() => setPreferenceType('no-preference')}
              />
              <span className="ml-2">No Preference</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="preference"
                value="employee-preference"
                checked={preferenceType === 'employee-preference'}
                onChange={() => setPreferenceType('employee-preference')}
              />
              <span className="ml-2">Employee Preference</span>
            </label>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isGenerating ? 'Generating...' : 'Generate'}
          </button>
        </div>
        {isGenerating && (
          <div className="mt-4 text-center">
            <p className="text-gray-600">Scheduling algorithm is running...</p>
            <div className="mt-2 flex justify-center">
              <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
        )}
      </div>
    );
};

const Schedule = ({ employees = [] }) => {
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [morningEmpWiseSlots, setMorningEmpWiseSlots] = useState({});
    const [eveningEmpWiseSlots, setEveningEmpWiseSlots] = useState({});
    const [employeeTable, setEmployeeTable] = useState([]);
    const [preferenceType, setPreferenceType] = useState('no-preference');

    const solutionAssumptions = [
      <span>Companies are willing to <strong>adjust work hours</strong>, and employees can shift schedules as recommended.</span>,
      <span>The system depends on <strong>real-time traffic data, </strong> <strong>but doesn’t</strong> account for <strong>weather or special events.</strong></span>,
      <span><strong>No changes</strong> required to existing infrastructure.</span>,
      <span>Employees have <strong>flexibility</strong> in slot choices, and companies enforce participation through <strong>policies</strong>.</span>,
  ];

    const schedulingAssumptions = [
      <span>Shuttles primarily run in <strong>7-8 AM and 10-11 AM</strong> slots.</span>,
      <span>Shuttles are <strong>not shared</strong> by all companies.</span>,
      <span><strong>1 Shuttle = 5 vehicles</strong>.</span>,
      <span>If a preferred <strong>slot isn't available</strong>, backlog employees will be <strong>assigned any remaining slots after all others are allocated</strong>.</span>,
      <span>Shuttle distribution follows a <strong>40-10-10-40</strong> pattern.</span>
  ];

    const onClickGenerate = (prefType) => {
        setPreferenceType(prefType);
        const morningEmpWiseSlots = assignSlotsWithoutPreference(employees, morningSlots, 'morning');
        setMorningEmpWiseSlots(morningEmpWiseSlots);

        const eveningEmpWiseSlots = assignSlotsWithoutPreference(employees, eveningSlots, 'evening');
        setEveningEmpWiseSlots(eveningEmpWiseSlots);
        setEmployeeTable(createEmployeeTable(morningEmpWiseSlots, eveningEmpWiseSlots));
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Solution Assumptions</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                        {solutionAssumptions.map((assumption, index) => (
                            <li key={index} className="text-gray-700">{assumption}</li>
                        ))}
                    </ul>
                </CardContent>
                <CardHeader>
                    <CardTitle>Scheduling Assumptions</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                        {schedulingAssumptions.map((assumption, index) => (
                            <li key={index} className="text-gray-700">{assumption}</li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            <br/>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Employee Schedules</CardTitle>
                    <Button onClick={() => setShowScheduleModal(true)}>Create Schedule</Button>
                </CardHeader>
                <SlotWiseDist type='Morning' empWiseSlots={morningEmpWiseSlots} />
                <hr />
                <br/>
                <SlotWiseDist type='Evening' empWiseSlots={eveningEmpWiseSlots} />
            </Card>

            <br/>

            <EmployeeTableSlots employees={employeeTable} />

            <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
                <DialogContent>
                    {/* <div className="py-4">
                        <p className="text-center text-gray-600">Scheduling algorithm is running...</p>
                        <div className="mt-4 flex justify-center">
                            <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    </div> */}
                    <ScheduleDialog onClose={() => setShowScheduleModal(false)} onSubmit={onClickGenerate} />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Schedule;
