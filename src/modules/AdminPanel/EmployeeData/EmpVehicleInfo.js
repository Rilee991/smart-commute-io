import { ChartBarIcon, ChartLineIcon, TableIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { BarChart, LineChart } from '../../../components/ui/Chart'
import { Button } from '../../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Cards';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/Table';
import { groupByDepartmentAndCompany } from '../../../components/data/utils';
import { startCase } from 'lodash';

const DeptWiseEmp = ({ transportWiseData = [] }) => {
    const [showEmployeeChart, setShowEmployeeChart] = useState(true);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Company-wise Employees Transport</CardTitle>
                <Button onClick={() => setShowEmployeeChart(!showEmployeeChart)}>
                    {showEmployeeChart ? <TableIcon className="mr-2" /> : <ChartBarIcon className="mr-2" />}
                    {showEmployeeChart ? 'Show Table' : 'Show Chart'}
                </Button>
            </CardHeader>
            <CardContent>
                {showEmployeeChart ? (
                    <BarChart xAxisLabel="Transport" yAxisLabel="Employees" data={transportWiseData} bars={Object.keys(transportWiseData[0] || {}).filter(item => item !== 'transport')} xAxisKey="transport" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {Object.keys(transportWiseData[0] || {}).map(row => (
                                    <TableHead key={row}>{startCase(row)}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transportWiseData && transportWiseData.map((item, idx) => (
                                <TableRow key={item.transport} className={idx === transportWiseData.length-2 ? "border-t border-solid border-black" : ""}>
                                    {Object.keys(transportWiseData[0] || {}).map(row => (
                                        <TableCell key={row} className={idx === transportWiseData.length-1 ? "font-bold" : ""}>{item[row]}</TableCell>
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

export default DeptWiseEmp;
