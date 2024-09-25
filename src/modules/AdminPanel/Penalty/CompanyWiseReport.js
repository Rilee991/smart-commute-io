import React, { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/Dropdown';
import { ChartLineIcon, ChevronLeftIcon, ChevronRightIcon, TableIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/Table';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Cards';
import { startCase } from 'lodash';
import { Button } from '../../../components/ui/Button';
import { BarChart } from '../../../components/ui/Chart';
import { transformMissedData } from '../../../components/data/utils';
import { companies } from '../../../components/data/data';

const CompanyWiseReport = ({ companyWiseReport = [] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [showGraph, setShowGraph] = useState(true);

    const itemsPerPage = 10;

    const totalPages = Math.ceil(companyWiseReport.length / itemsPerPage);

    const currentCompanyWiseReport = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return companyWiseReport.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, companyWiseReport]);

    const barData = useMemo(() => {
        return transformMissedData(companyWiseReport);
    }, [companyWiseReport]);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Company-wise Penalty Report</CardTitle>
                <Button onClick={() => setShowGraph(!showGraph)}>
                    {showGraph ? <TableIcon className="mr-2" /> : <ChartLineIcon className="mr-2" /> }
                    {showGraph ? 'Show Table View' : 'Show Chart View'}
                </Button>
            </CardHeader>
            <CardContent>
                {showGraph ? (
                    <div>
                        <BarChart xAxisLabel="Date" yAxisLabel="Employees" data={barData} bars={companies} xAxisKey="date" />
                    </div>
                ) : (
                    <React.Fragment>
                        <div className="max-h-[400px] overflow-auto">
                            <Table>
                                <TableHeader className="sticky top-0">
                                    <TableRow>
                                        {Object.keys(companyWiseReport[0] || {}).map(col => <TableHead key={col}>{startCase(col)}</TableHead>)}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentCompanyWiseReport && currentCompanyWiseReport.map((item, idx) => (
                                        <TableRow key={idx}>
                                            {Object.keys(item).map(row => (
                                                <TableCell key={row}>{item[row]}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex items-center justify-between space-x-2 py-4">
                            <button
                                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeftIcon className="h-5 w-5 mr-2" />
                                Previous
                            </button>
                            <div className="text-sm text-gray-700">
                                Page {currentPage} of {totalPages}
                            </div>
                            <button
                                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                                <ChevronRightIcon className="h-5 w-5 ml-2" />
                            </button>
                        </div>
                    </React.Fragment>)
                }
            </CardContent>
        </Card>
    );
}

export default CompanyWiseReport;
