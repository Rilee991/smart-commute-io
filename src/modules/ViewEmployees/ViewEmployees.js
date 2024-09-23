import React, { useState } from 'react';
import { companies, groupByDepartmentAndCompany, morningSlots, shuttleCapacity, shuttleEquivalentVehicles } from '../../constants';

const ViewEmployees = ({ employees = [] }) => {
  const tableData = groupByDepartmentAndCompany(employees);
  const [assignments, setAssignments] = useState({});

  function assignSlots(employees, slots, period) {
    const shuttleUsers = employees.filter(e => e.transport === 'shuttle');
    const personalUsers = employees.filter(e => e.transport === 'personal');
    
    const actualShuttles = companies.length; // One shuttle per company
    const totalVehicles = personalUsers.length + (actualShuttles * shuttleEquivalentVehicles);
    const avgVehiclesPerSlot = totalVehicles / slots.length;
    
    const assignments = Object.fromEntries(slots.map(slot => [slot, []]));
    
    if (period === 'morning') {
      const hotSlots = ['7-8', '10-11'];
      const regularSlots = ['8-9', '9-10'];
      const hotSlotPercentage = 0.4;
      
      let remainingShuttles = actualShuttles;
      for (let slot of hotSlots) {
        const slotShuttles = Math.ceil(actualShuttles * hotSlotPercentage);
        const slotCapacity = slotShuttles * shuttleCapacity;
        assignments[slot] = shuttleUsers.splice(0, slotCapacity);
        remainingShuttles -= slotShuttles;
      }
      
      for (let slot of regularSlots) {
        const slotShuttles = Math.floor(remainingShuttles / regularSlots.length);
        const slotCapacity = slotShuttles * shuttleCapacity;
        assignments[slot].push(...shuttleUsers.splice(0, slotCapacity));
        remainingShuttles -= slotShuttles;
      }
      
      // Distribute any remaining shuttle users
      let slotIndex = 0;
      while (shuttleUsers.length > 0) {
        const currentSlot = slots[slotIndex];
        assignments[currentSlot].push(shuttleUsers.pop());
        slotIndex = (slotIndex + 1) % slots.length;
      }
    } else {
      // Evenly distribute shuttle users for evening
      const shuttlesPerSlot = Math.floor(actualShuttles / slots.length);
      const extraShuttles = actualShuttles % slots.length;
      
      slots.forEach((slot, index) => {
        let slotShuttles = shuttlesPerSlot + (index < extraShuttles ? 1 : 0);
        const slotCapacity = slotShuttles * shuttleCapacity;
        assignments[slot].push(...shuttleUsers.splice(0, slotCapacity));
      });
      
      // Distribute any remaining shuttle users
      let slotIndex = 0;
      while (shuttleUsers.length > 0) {
        const currentSlot = slots[slotIndex];
        assignments[currentSlot].push(shuttleUsers.pop());
        slotIndex = (slotIndex + 1) % slots.length;
      }
    }
    
    // Assign personal vehicle users
    for (let slot of slots) {
      const currentVehicles = assignments[slot].filter(e => e.transport === 'personal').length + 
        (Math.ceil(assignments[slot].filter(e => e.transport === 'shuttle').length / shuttleCapacity) * shuttleEquivalentVehicles);
      
      const remainingCapacity = Math.max(0, Math.floor(avgVehiclesPerSlot - currentVehicles));
      assignments[slot].push(...personalUsers.splice(0, remainingCapacity));
    }
    
    // Distribute any remaining employees
    for (let user of personalUsers) {
      const minSlot = slots.reduce((a, b) => 
        assignments[a].length <= assignments[b].length ? a : b
      );
      assignments[minSlot].push(user);
    }
    
    setAssignments(assignments);
  }

  console.log(assignments);

  return (
    <div style={{ padding: '20px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Department</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>MS</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Google</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Intel</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index} style={{ borderBottom: index >= tableData.length-2 ? '2px solid black' : '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{row.department}</td>
              <td style={{ padding: '10px' }}>{row.Microsoft}</td>
              <td style={{ padding: '10px' }}>{row.Google}</td>
              <td style={{ padding: '10px' }}>{row.Intel}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
      <div className="flex justify-end">
        <button onClick={() => assignSlots(employees, morningSlots, 'morning')} className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out">Generate Schedule</button>
      </div>
    </div>
  );
};

export default ViewEmployees;
