import React, { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/Dropdown';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/Table';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Cards';
import { startCase } from 'lodash';
import { companies, destinations } from '../../../components/data/data';

export default function EmployeeTable({ employees = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [selectedDestination, setSelectedDestination] = useState("All");

  const itemsPerPage = 10;

  const dropdownCompanies = useMemo(() => {
    return ["All", ...new Set(employees.map(emp => emp.company))];
  }, []);

  const dropdownDestinations = useMemo(() => {
    return ["All", ...new Set(employees.map(emp => emp.destination))];
  }, []);

  const filteredEmployees = useMemo(() => {
    const conditionalCompanies = selectedCompany === "All" ? dropdownCompanies.slice(1) : [selectedCompany];
    const conditionalDestinations = selectedDestination === "All" ? dropdownDestinations.slice(1) : [selectedDestination];

    return employees.filter(emp => conditionalCompanies.includes(emp.company) && conditionalDestinations.includes(emp.destination));
  }, [selectedCompany, selectedDestination]);

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const currentEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredEmployees.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredEmployees]);

  const handleCompanyChange = (value) => {
    setSelectedCompany(value);
    setCurrentPage(1);  // Reset to first page when changing company filter
  };

  const handleDestinationChange = (value) => {
    setSelectedDestination(value);
    setCurrentPage(1);  // Reset to first page when changing company filter
  };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Company-wise Employee Info</CardTitle>
                <div className="flex gap-3">
                    <Select value={selectedDestination}>
                        <SelectTrigger>
                            <SelectValue placeholder={selectedDestination === "All" ? "Filter by Destination" : selectedDestination} />
                        </SelectTrigger>
                        <SelectContent>
                            {dropdownDestinations.map((destination) => (
                                <SelectItem key={destination} value={destination} onChange={handleDestinationChange}>
                                    {destination}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={selectedCompany}>
                        <SelectTrigger>
                            <SelectValue placeholder={selectedCompany === "All" ? "Filter by Company" : selectedCompany} />
                        </SelectTrigger>
                        <SelectContent>
                            {dropdownCompanies.map((company) => (
                                <SelectItem key={company} value={company} onChange={handleCompanyChange}>
                                    {company}
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
                                <TableHead>{"Emp ID"}</TableHead>
                                <TableHead>{"User ID"}</TableHead>
                                <TableHead>{"Name"}</TableHead>
                                <TableHead>{"Company"}</TableHead>
                                <TableHead>{"Department"}</TableHead>
                                <TableHead>{"Transport"}</TableHead>
                                <TableHead>{"Destination"}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentEmployees && currentEmployees.map((item, idx) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.userId}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.company}</TableCell>
                                    <TableCell>{item.department}</TableCell>
                                    <TableCell>{item.transport}</TableCell>
                                    <TableCell>{item.destination}</TableCell>
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