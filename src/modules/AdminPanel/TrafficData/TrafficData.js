import { ChartLineIcon, TableIcon } from 'lucide-react';
import React, { useState } from 'react';
import { LineChart } from '../../../components/ui/Chart'
import { Button } from '../../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Cards';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/Table';

const TrafficData = ({ trafficPrediction = [], type = "Morning" }) => {
    const [showTrafficChart, setShowTrafficChart] = useState(true);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{type} Traffic for Next 7 Days</CardTitle>
                <Button onClick={() => setShowTrafficChart(!showTrafficChart)}>
                {showTrafficChart ? <TableIcon className="mr-2" /> : <ChartLineIcon className="mr-2" /> }
                {showTrafficChart ? 'Show Table View' : 'Show Chart View'}
                </Button>
            </CardHeader>
            <CardContent>
            {showTrafficChart ? (
                <div>
                    <LineChart xAxisLabel="Date" yAxisLabel="Vehicles" data={trafficPrediction} xAxisKey="date" lines={Object.keys(trafficPrediction[0]).filter(item => item !== 'date')} />
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>{"Date"}</TableHead>
                        {Object.keys(trafficPrediction[0]).filter(item => item !== 'date').map(item => (
                            <TableHead key={item}>{item}</TableHead>
                        ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {trafficPrediction.map((pred) => (
                            <TableRow key={pred.date}>
                                <TableCell>{pred.date}</TableCell>
                                {Object.keys(trafficPrediction[0]).filter(item => item !== 'date').map(item => (
                                <TableCell key={item}>{pred[item]}</TableCell>
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

export default TrafficData;
