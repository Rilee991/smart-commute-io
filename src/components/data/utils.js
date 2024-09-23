import { firstNames, lastNames } from "./data";

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
