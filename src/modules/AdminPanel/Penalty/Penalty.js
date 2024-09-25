import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Cards"
import { Button } from "../../../components/ui/Button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/Tabs"
import { LineChart, BarChart } from '../../../components/ui/Chart'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/Table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/Dialog"
import { Progress } from "../../../components/ui/Progress"
import { ArrowRightIcon, BarChartIcon, CalendarIcon, AlertTriangleIcon, TableIcon, ChartLineIcon, ChartBarIcon } from 'lucide-react'
import { trafficPrediction } from '../../../components/data/data'
import { assignLateStatusToEmployees, getMissedSlotsSummary, groupByDepartmentAndCompany } from '../../../components/data/utils'
import { startCase } from 'lodash'
import DateWiseReport from './DateWiseReport'
import EmployeeWiseReport from './EmployeeWiseReport'
import CompanyWiseReport from './CompanyWiseReport'

const Penalty = ({ employees = [] }) => {
    const [dateWiseEmps, setDateWiseEmps] = useState({});
    const [dateWiseEmpReport, setDateWiseEmpReport] = useState([]);
    const [empWiseReport, setEmpWiseReport] = useState([]);
    const [companyWiseReport, setCompanyWiseReport] = useState([]);

    useEffect(() => {
        const resp = assignLateStatusToEmployees(employees);
        setDateWiseEmps(resp);
        setDateWiseEmpReport(resp.map(item => ({ date: item.date, missedMornings: item.missedMornings, missedEvenings: item.missedEvenings })));
        const dayWise = resp.map(item => item.employees);
        let empWise = [];
        for(const day of dayWise) {
            empWise = [ ...empWise, ...day.filter(item => (item.isMorningLate || item.isEveningLate) === true) ];
        }
        setEmpWiseReport(empWise);

        const companyWise = getMissedSlotsSummary(empWise);
        setCompanyWiseReport(companyWise);
    }, [employees.length]);

    return (
        <div>
            <DateWiseReport dateWiseReport={dateWiseEmpReport} />
            <br/>
            <EmployeeWiseReport employees={empWiseReport} />
            <br/>
            <CompanyWiseReport companyWiseReport={companyWiseReport} />
        </div>
    );
}

export default Penalty;
