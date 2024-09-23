import { ChartBarIcon, ChartLineIcon, TableIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { BarChart, LineChart } from '../../../components/ui/Chart'
import { Button } from '../../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Cards';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/Table';
import { groupByDepartmentAndCompany } from '../../../components/data/utils';
import { startCase } from 'lodash';

const EmployeeData = ({ employees = [] }) => {
    const [showEmployeeChart, setShowEmployeeChart] = useState(true);
    const [deptEmpChartData, setDeptEmpChartData] = useState([]);
    const [deptEmpTableData, setDeptEmpTableData] = useState([]);

    useEffect(() => {
      const deptWiseEmpCount = groupByDepartmentAndCompany(employees);

      setDeptEmpChartData(deptWiseEmpCount.slice(0, deptWiseEmpCount.length-1));
      setDeptEmpTableData(deptWiseEmpCount);
    }, [employees.length]);

    return (
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
                    <BarChart data={deptEmpChartData} bars={Object.keys(deptEmpChartData[0] || {}).filter(item => item !== 'department')} xAxisKey="department" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {Object.keys(deptEmpTableData[0] || {}).map(row => (
                                    <TableHead key={row}>{startCase(row)}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {deptEmpTableData && deptEmpTableData.map((item, idx) => (
                                <TableRow key={item.department} className={idx === deptEmpTableData.length-2 ? "border-t border-solid border-black" : ""}>
                                    {Object.keys(deptEmpTableData[0] || {}).map(row => (
                                        <TableCell key={row} className={idx === deptEmpTableData.length-1 ? "font-bold" : ""}>{item[row]}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}

export default EmployeeData;
