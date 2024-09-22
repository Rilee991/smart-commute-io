import { useState } from 'react';
import './assets/tailwindcss/tailwind.css';
import TrafficDataGraph from './modules/TrafficDataGraph/TrafficDataGraph';
import ViewEmployees from './modules/ViewEmployees/ViewEmployees';

function App() {
	const [viewEmployees, setViewEmployees] = useState(false);

	return (
		<div className="px-3">
			<div className="grid place-content-center text-3xl font-bold">Smart Commute IO - Powered by Drivomate</div>
			<br/>
			<button onClick={() => setViewEmployees(!viewEmployees)} className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out">{viewEmployees ? "Hide" : "View"} Employees</button>
			<br/><br/>
			{!viewEmployees ? <div>
				<h1 className="text-2xl font-semibold">Traffic data prediction for upcoming days</h1>
				<TrafficDataGraph />
			</div> : null}
			{viewEmployees ? <div>
				<h1 className="text-2xl font-semibold">Company wise employees</h1>
				<ViewEmployees />
			</div> : null}
		</div>
  	);
}

export default App;
