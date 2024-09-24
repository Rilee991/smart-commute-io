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
import { assignSlotsWithoutPreference, groupByDepartmentAndCompany } from '../../../components/data/utils'
import { isEmpty, startCase } from 'lodash';

const SlotWiseDist = ({ empWiseSlots = {}, type = 'Morning' }) => {
    return (
        <CardContent>
            <div className="text-2xl font-semibold">{type} slots</div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Slot</TableHead>
                        <TableHead>Employee count</TableHead>
                        <TableHead>Personal vehicles count</TableHead>
                        <TableHead>Shuttle Count</TableHead>
                    </TableRow>
                </TableHeader>
                {!isEmpty(empWiseSlots) ? 
                    <TableBody>
                        {Object.keys(empWiseSlots).map(slot => {
                            const totalSlotEmps = empWiseSlots[slot].length;
                            const personalVehicles = empWiseSlots[slot].filter(item => item.transport === "Personal").length;
                            const shuttles = (totalSlotEmps - personalVehicles)/shuttleCapacity;

                            return (
                                <TableRow key={slot}>
                                    <TableCell>{slot}</TableCell>
                                    <TableCell>{totalSlotEmps}</TableCell>
                                    <TableCell>{personalVehicles}</TableCell>
                                    <TableCell>{shuttles}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody> :null}
            </Table>
            {isEmpty(empWiseSlots) ? <div className="grid place-content-center text-sm">No slots generated.</div> : null}
        </CardContent>
    );
}

export default SlotWiseDist;
