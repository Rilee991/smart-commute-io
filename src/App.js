import { uniqueId } from 'lodash';
import { useEffect, useState } from 'react';
import './assets/tailwindcss/tailwind.css';
import { companies, departments, employeesPerCompany, eveningSlots, generateRandomName, morningSlots, shuttlePercentage } from './constants';
import AdminPanel from './modules/AdminPanel/AdminPanel';
  
function App() {
	const [employees, setEmployees] = useState([]);

	useEffect(() => {
		function generateEmployees() {
			let employees = [];
			for (let company of companies) {
				for (let i = 0; i < employeesPerCompany; i++) {
					const isShuttleUser = i < employeesPerCompany * shuttlePercentage;

					employees.push({
						id: `${company}_${i}`, //keep
						company: company,
						transport: isShuttleUser ? 'shuttle' : 'personal', //keep
						userId: uniqueId("UID-"), //keep
						pwd: uniqueId(),
						isActive: true,
						name: generateRandomName(), //keep
						isShuttle: isShuttleUser,
						department: departments[Math.floor(Math.random() * 4)], //keep
						morningPreference: isShuttleUser ? morningSlots[Math.floor(Math.random() * morningSlots.length)] : null,
						eveningPreference: isShuttleUser ? eveningSlots[Math.floor(Math.random() * eveningSlots.length)] : null
					});
				}
			}
			return employees;
		}

		const employees = generateEmployees();
		setEmployees(employees);
	}, []);

	return (
		<div>
			<AdminPanel employees={employees} />
		</div>
  	);
}

export default App;
