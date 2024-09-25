import React, { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/Dropdown';
import { ChartLineIcon, ChevronLeftIcon, ChevronRightIcon, TableIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/Table';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Cards';
import { startCase } from 'lodash';
import { Button } from '../../../components/ui/Button';

const EmployeeWiseReport = ({ employees = [] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCompany, setSelectedCompany] = useState("All");
    const [selectedDate, setSelectedDate] = useState("All");

    const itemsPerPage = 10;

    const companies = useMemo(() => {
        return ["All", ...new Set(employees.map(emp => emp.company))];
    }, [employees.length]);

    const dates = useMemo(() => {
        return ["All", ...new Set(employees.map(emp => emp.date))];
    }, [employees.length]);

    const filteredEmployees = useMemo(() => {
        const conditionalCompanies = selectedCompany === "All" ? companies.slice(1) : [selectedCompany];
        const conditionalDates = selectedDate === "All" ? dates.slice(1) : [selectedDate];
    
        return employees.filter(emp => conditionalCompanies.includes(emp.company) && conditionalDates.includes(emp.date));
      }, [selectedCompany, selectedDate, employees.length]);

    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

    const currentEmployees = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredEmployees.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, filteredEmployees]);

    const handleCompanyChange = (value) => {
        setSelectedCompany(value);
        setCurrentPage(1);  // Reset to first page when changing company filter
    };

    const handleDateChange = (value) => {
        setSelectedDate(value);
        setCurrentPage(1);  // Reset to first page when changing company filter
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Employee-wise Penalty Report</CardTitle>
                <div className="flex gap-3">
                    <Select value={selectedCompany}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by Company" />
                        </SelectTrigger>
                        <SelectContent>
                            {companies.map((company) => (
                                <SelectItem key={company} value={company} onChange={handleCompanyChange}>
                                    {company}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={selectedDate}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by Date" />
                        </SelectTrigger>
                        <SelectContent>
                            {dates.map((date) => (
                                <SelectItem key={date} value={date} onChange={handleDateChange}>
                                    {date}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <div className="max-h-[400px] overflow-auto">
                    <Table>
                        <TableHeader className="sticky top-0">
                            <TableRow>
                                <TableHead>{"Date"}</TableHead>
                                <TableHead>{"Emp ID"}</TableHead>
                                <TableHead>{"Name"}</TableHead>
                                <TableHead>{"Missed Entry"}</TableHead>
                                <TableHead>{"Missed Exit"}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentEmployees && currentEmployees.map((item, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{item["date"]}</TableCell>
                                    <TableCell>{item["id"]}</TableCell>
                                    <TableCell>{item["name"]}</TableCell>
                                    <TableCell>{item["isMorningLate"] === true ? "Yes" : "No"}</TableCell>
                                    <TableCell>{item["isEveningLate"] === true ? "Yes" : "No"}</TableCell>
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
            </CardContent>
        </Card>
    );
}

export default EmployeeWiseReport;
