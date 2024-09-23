import React, { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/Dropdown';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/Table';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Cards';
import { startCase } from 'lodash';

// Mock data for employees
const employeess = [
  { company: "TechCorp", name: "John Doe", empid: "TC001" },
  { company: "TechCorp", name: "Jane Smith", empid: "TC002" },
  { company: "DataSoft", name: "Alice Johnson", empid: "DS001" },
  { company: "DataSoft", name: "Bob Williams", empid: "DS002" },
  { company: "WebSolutions", name: "Charlie Brown", empid: "WS001" },
  { company: "WebSolutions", name: "Diana Miller", empid: "WS002" },
  { company: "TechCorp", name: "Eva Davis", empid: "TC003" },
  { company: "DataSoft", name: "Frank Wilson", empid: "DS003" },
  { company: "WebSolutions", name: "Grace Taylor", empid: "WS003" },
  { company: "TechCorp", name: "Henry Moore", empid: "TC004" },
  { company: "DataSoft", name: "Ivy Clark", empid: "DS004" },
  { company: "WebSolutions", name: "Jack Lewis", empid: "WS004" },
];

export default function EmployeeTable({ employees = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState("All");

  const itemsPerPage = 10;

  const companies = useMemo(() => {
    return ["All", ...new Set(employees.map(emp => emp.company))];
  }, []);

  const filteredEmployees = useMemo(() => {
    return selectedCompany === "All"
      ? employees
      : employees.filter(emp => emp.company === selectedCompany);
  }, [selectedCompany]);

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const currentEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredEmployees.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredEmployees]);

  const handleCompanyChange = (value) => {
      console.log("Change", value);
    setSelectedCompany(value);
    setCurrentPage(1);  // Reset to first page when changing company filter
  };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Company-wise Employee Info</CardTitle>
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
            </CardHeader>
            <CardContent>
                <div className="max-h-[400px] overflow-auto">
                    <Table>
                        <TableHeader className="sticky top-0">
                            <TableRow>
                                <TableHead>{"Emp ID"}</TableHead>
                                <TableHead>{"Name"}</TableHead>
                                <TableHead>{"Company"}</TableHead>
                                <TableHead>{"Department"}</TableHead>
                                <TableHead>{"Transport"}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentEmployees && currentEmployees.map((item, idx) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.company}</TableCell>
                                    <TableCell>{item.department}</TableCell>
                                    <TableCell>{item.transport}</TableCell>
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