import { companies, firstNames, lastNames, shuttleCapacity, shuttleEquivalentVehicles } from "./data";

export const generateTrafficData = () => {
    const generateDate = (daysFromNow) => {
        const date = new Date();
        date.setDate(date.getDate() + daysFromNow);
        const options = { day: 'numeric', month: 'short' };
        return date.toLocaleDateString('en-US', options);
    };

    const generateTraffic = () => {
        // Base numbers for traffic in the morning slots
        const morningTraffic = {
            '7-8 AM': Math.floor(Math.random() * 10) + 15, // Less traffic in 7-8 AM
            '8-9 AM': Math.floor(Math.random() * 20) + 60, // Peak traffic in 8-9 AM
            '9-10 AM': Math.floor(Math.random() * 10) + 50, // Slight decrease in 9-10 AM
            '10-11 AM': Math.floor(Math.random() * 10) + 30 // More decrease in 10-11 AM
        };

        // Calculate the total morning traffic
        const morningTotal = Object.values(morningTraffic).reduce((acc, val) => acc + val, 0);

        // Base numbers for traffic in the evening slots, adjusted to match the morning total
        const eveningTraffic = {
            '6-7 PM': Math.floor(Math.random() * 10) + 30, // Traffic starts in 6-7 PM
            '7-8 PM': Math.floor(Math.random() * 20) + 60, // Peak traffic in 7-8 PM
            '8-9 PM': Math.floor(Math.random() * 10) + 45, // Slight decrease in 8-9 PM
            '9-10 PM': 0 // Placeholder to adjust the total
        };

        // Calculate the evening total excluding the last slot
        let eveningPartialTotal = Object.values(eveningTraffic).slice(0, -1).reduce((acc, val) => acc + val, 0);

        // Adjust the last slot to ensure evening total equals morning total
        eveningTraffic['9-10 PM'] = morningTotal - eveningPartialTotal;

        return { morning: morningTraffic, evening: eveningTraffic };
    };

    const data = { morning: [], evening: [] };

    for (let i = 1; i <= 7; i++) {
        const dateName = generateDate(i);
        const { morning, evening } = generateTraffic();

        data.morning.push({
            date: `${dateName}`,
            ...morning
        });

        data.evening.push({
            date: `${dateName}`,
            ...evening
        });
    }

    return data;
};

export function generateRandomName() {
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return `${randomFirstName} ${randomLastName}`;
}

export function groupByDepartmentAndCompany(employees) {
    const groupedData = {};
    const total = { department: 'Total' };
  
    employees.forEach(employee => {
      const { department, company } = employee;
  
      if (!groupedData[department]) {
        groupedData[department] = { department };
      }
  
      if (!groupedData[department][company]) {
        groupedData[department][company] = 0;
      }
  
      if (!total[company]) {
        total[company] = 0;
      }
  
      groupedData[department][company]++;
      total[company]++;
    });
  
    const result = Object.values(groupedData);
    result.push(total); // Add the total object at the end of the result array
  
    return result;
}

export function groupByTransport(employees) {
    const groupedData = {};
    const total = { transport: 'Total' };
  
    employees.forEach(employee => {
      const { transport, company } = employee;
  
      if (!groupedData[transport]) {
        groupedData[transport] = { transport };
      }
  
      if (!groupedData[transport][company]) {
        groupedData[transport][company] = 0;
      }
  
      if (!total[company]) {
        total[company] = 0;
      }
  
      groupedData[transport][company]++;
      total[company]++;
    });
  
    const result = Object.values(groupedData);
    result.push(total); // Add the total object at the end of the result array
  
    return result;
}

export function assignSlotsWithoutPreference(employees, slots, period) {
  const shuttleUsers = employees.filter(e => e.transport === 'Shuttle');
  const personalUsers = employees.filter(e => e.transport === 'Individual');
  
  const actualShuttles = companies.length; // One shuttle per company
  const totalVehicles = personalUsers.length + (actualShuttles * shuttleEquivalentVehicles);
  const avgVehiclesPerSlot = totalVehicles / slots.length;
  
  const assignments = Object.fromEntries(slots.map(slot => [slot, []]));
  
  if (period === 'morning') {
    const hotSlots = ['7-8 AM', '10-11 AM'];
    const regularSlots = ['8-9 AM', '9-10 AM'];
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
    const hotSlots = ['6-7 PM', '9-10 PM'];
    const regularSlots = ['7-8 PM', '8-9 PM'];
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
  }
  
  // Assign personal vehicle users
  for (let slot of slots) {
    const currentVehicles = assignments[slot].filter(e => e.transport === 'Individual').length + 
      (Math.ceil(assignments[slot].filter(e => e.transport === 'Shuttle').length / shuttleCapacity) * shuttleEquivalentVehicles);
    
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
  
  return assignments;
}

export function createEmployeeTable(morningAssignments, eveningAssignments) {
  const employeeTable = [];

  const allEmployees = new Set();
  
  for (const period of ['morning', 'evening']) {
    const assignments = period === 'morning' ? morningAssignments : eveningAssignments;
    for (const [slot, employees] of Object.entries(assignments)) {
      for (const employee of employees) {
        if (!allEmployees.has(employee.id)) {
          allEmployees.add(employee.id);
          employeeTable.push({
            empId: employee.id,
            name: employee.name,
            company: employee.company,
            department: employee.department,
            transport: employee.transport,
            morningSlot: period === 'morning' ? slot : '',
            eveningSlot: period === 'evening' ? slot : ''
          });
        } else {
          const employeeRow = employeeTable.find(row => row.empId === employee.id);
          if (employeeRow) {
            employeeRow[`${period}Slot`] = slot;
          }
        }
      }
    }
  }

  return employeeTable;
}

export function assignLateStatusToEmployees(employees) {
  const totalEmployees = employees.length;
  const last7Days = [];

  // Generate the last 7 days starting from yesterday
  for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      last7Days.push(date.toISOString().split('T')[0]);
  }

  // For each day in the last 7 days, assign late status
  const result = last7Days.map((date) => {
      const maxLateEmployees = Math.ceil(totalEmployees * Math.random() * 0.05); // 10% of total employees
      // Shuffle the employees array to randomly select late employees
      const shuffledEmployees = [...employees].sort(() => Math.random() - 0.5);

      // Select late employees for the morning and evening (max 10%)
      const morningLateEmployees = shuffledEmployees.slice(0, maxLateEmployees);
      const eveningLateEmployees = shuffledEmployees.slice(maxLateEmployees, maxLateEmployees * (Math.random()+0.4) * 2);

      // Map over the employees and attach the late status
      const employeesForDay = employees.map((employee) => {
          return {
              ...employee,
              date,
              isMorningLate: morningLateEmployees.includes(employee),
              isEveningLate: eveningLateEmployees.includes(employee),
          };
      });

      return { date, missedMornings: morningLateEmployees.length, missedEvenings: eveningLateEmployees.length, employees: employeesForDay };
  });

  return result;
}

export function getMissedSlotsSummary(employees) {
  const summary = {};

  employees.forEach(employee => {
      const { date, company, isMorningLate, isEveningLate } = employee;

      // Initialize an entry for the company-date combination if not already present
      if (!summary[date]) {
          summary[date] = {};
      }

      if (!summary[date][company]) {
          summary[date][company] = { missedMornings: 0, missedEvenings: 0 };
      }

      // Increment missed mornings and evenings based on late status
      if (isMorningLate) {
          summary[date][company].missedMornings += 1;
      }

      if (isEveningLate) {
          summary[date][company].missedEvenings += 1;
      }
  });

  // Convert the summary object into an array of objects with the desired structure
  const result = [];
  for (const date in summary) {
      for (const company in summary[date]) {
          result.push({
              date,
              company,
              missedMornings: summary[date][company].missedMornings,
              missedEvenings: summary[date][company].missedEvenings,
          });
      }
  }

  return result;
}

export function transformMissedData(dataArray) {
  // Create a map to store the result grouped by date
  const resultMap = new Map();

  dataArray.forEach(data => {
      const { date, company, missedMornings, missedEvenings } = data;

      // If the date already exists in the map, add/update the company data
      if (resultMap.has(date)) {
          const existingData = resultMap.get(date);
          existingData[company] = (existingData[company] || 0) + missedMornings + missedEvenings;
      } else {
          // If the date doesn't exist, create a new entry
          resultMap[date] = {};

          for(const com of companies) {
            resultMap[date] = { ...resultMap[date], [com]: 0 }
          }
          // companies.forEach(com => resultMap[date] = {
          //   [com]: 0
          // });

          resultMap.set(date, {
              date,
              [company]: missedMornings + missedEvenings
          });
      }
  });

  // Convert the result map back into an array
  return Array.from(resultMap.values());
}
