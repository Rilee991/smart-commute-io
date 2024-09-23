import { ChartBarIcon, ChartLineIcon, TableIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { BarChart, LineChart } from '../../../components/ui/Chart'
import { Button } from '../../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Cards';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/Table';
import { groupByDepartmentAndCompany, groupByTransport } from '../../../components/data/utils';
import { startCase } from 'lodash';
import DeptWiseEmp from './DeptWiseEmp';
import CompanyWiseEmp from './CompanyWiseEmp';
import EmpVehicleInfo from './EmpVehicleInfo';

const EmployeeData = ({ employees = [] }) => {
    const [deptEmpChartData, setDeptEmpChartData] = useState([]);
    const [deptEmpTableData, setDeptEmpTableData] = useState([]);
    const [transportWiseData, setTransportWiseData] = useState([]);

    useEffect(() => {
        const deptWiseEmpCount = groupByDepartmentAndCompany(employees);
        setDeptEmpChartData(deptWiseEmpCount.slice(0, deptWiseEmpCount.length-1));
        setDeptEmpTableData(deptWiseEmpCount);

        const transportWiseData = groupByTransport(employees);
        setTransportWiseData(transportWiseData);
    }, [employees.length]);

    return (
        <div>
            <DeptWiseEmp deptEmpChartData={deptEmpChartData} deptEmpTableData={deptEmpTableData} />
            <br/>
            <CompanyWiseEmp employees={employees} />
            <br/>
            <EmpVehicleInfo transportWiseData={transportWiseData} />
        </div>
    );
}

export default EmployeeData;
