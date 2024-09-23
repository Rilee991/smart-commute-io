import { uniqueId } from 'lodash';
import { useEffect, useState } from 'react';
import './assets/tailwindcss/tailwind.css';
import { companies, departments, employeesPerCompany, eveningSlots, generateRandomName, morningSlots, shuttlePercentage } from './constants';
import AdminPanel from './modules/AdminPanel/AdminPanel';
import TrafficDataGraph from './modules/TrafficDataGraph/TrafficDataGraph';
import ViewEmployees from './modules/ViewEmployees/ViewEmployees';
// import BarGraph from './modules/BarGraph/BarGraph';
// const data = [
// 	{ label: "Jan", values: [{ name: "Product A", value: 30 }, { name: "Product B", value: 20 }] },
// 	{ label: "Feb", values: [{ name: "Product A", value: 40 }, { name: "Product B", value: 25 }] },
// 	// more data...
// ];
  
function App() {
	const [employees, setEmployees] = useState([]);
	const [viewEmployees, setViewEmployees] = useState(false);

	useEffect(() => {
		function generateEmployees() {
			let employees = [];
			for (let company of companies) {
				for (let i = 0; i < employeesPerCompany; i++) {
					const isShuttleUser = i < employeesPerCompany * shuttlePercentage;

					employees.push({
						id: `${company}_${i}`,
						company: company,
						transport: isShuttleUser ? 'shuttle' : 'personal',
						userId: uniqueId("UID-"),
						pwd: uniqueId(),
						isActive: true,
						name: generateRandomName(),
						isShuttle: isShuttleUser,
						department: departments[Math.floor(Math.random() * 4)],
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
		// <div className="px-3">
		// 	<div className="grid place-content-center text-3xl font-bold">Smart Commute IO - Powered by Drivomate</div>
		// 	<br/>
		// 	<button onClick={() => setViewEmployees(!viewEmployees)} className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out">{viewEmployees ? "Hide" : "View"} Employees</button>
		// 	<br/><br/>
		// 	{!viewEmployees ? <div>
		// 		<h1 className="text-2xl font-semibold">Traffic data prediction for upcoming days</h1>
		// 		<TrafficDataGraph />
		// 	</div> : null}
		// 	{viewEmployees ? <div>
		// 		<h1 className="text-2xl font-semibold">Company wise employees</h1>
		// 		<ViewEmployees employees={employees} />
		// 	</div> : null}
		// 	<br/><br/>
		// </div>
		<div>
			<AdminPanel />
		</div>
  	);
}

export default App;
